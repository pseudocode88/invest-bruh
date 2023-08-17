import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { Navbar } from "../../components/NavBar";
import { PageHeader } from '../../components/PageHeader';
import { ActionCard } from "../../components/ActionCard";
import { UniSelect } from "../../components/UniSelect";
import { Modal } from "../../components/Modal";

import { AddTransactionForm } from "./AddTransactionForm";
import { AssetBar } from "./AssetBar";
import { AssetDetails } from "./AssetDetails";

import routes from '../../constants/routes';

import wrapper from "../../shared_styles/container.modules.scss";
import styles from "./holdings.modules.scss";

import { AddAssetForm } from "./AddAssetForm";
import { ManageGroupForm } from "./ManageGroupForm";

import ipcRoutes from "../../constants/ipc_routes"

const IPC = window.electron.ipcRenderer;

export const Holdings = () => {
    const navigate = useNavigate();

    const [groupIndex, setGroupIndex] = useState(0);
    const [assetIndex, setAssetIndex] = useState(0);
    const [selectedGroup, setSelectedGroup] = useState({});
    const [selectedAsset, setSelectedAsset] = useState({});
    const [groups, setGroups] = useState([{ name: '', assets: [{ ticker: '' }], _id: '' }]);
    const [transactions, setTransactions] = useState([]);
    const [showManageGroupsModal, setShowManageGroupsModal] = useState(false);
    const [showAddAssetModal, setShowAddAssetModal] = useState(false);
    const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);

    useEffect(() => {
        IPC.send(ipcRoutes.groups.get.default);
        IPC.on(ipcRoutes.groups.get.success, handleIPCResponse.getGroupsSuccess);
        IPC.on(ipcRoutes.groups.add.success, handleIPCResponse.addGroupSuccess);
        IPC.on(ipcRoutes.groups.delete.success, handleIPCResponse.deleteGroupSuccess);
        IPC.on(ipcRoutes.groups.addAsset.success, handleIPCResponse.addAssetSuccess);
        IPC.on(ipcRoutes.groups.position.update.success, handleIPCResponse.positionUpdateSuccess);
        IPC.on(ipcRoutes.transaction.add.success, handleIPCResponse.addTransactionSuccess);
        IPC.on(ipcRoutes.transaction.get.success, handleIPCResponse.getTransactionSuccess);
    }, []);

    useEffect(() => {
        setSelectedGroup(groups[0]);
        setSelectedAsset(groups[0].assets[0]);
    }, [groups])

    useEffect(() => {
        IPC.send(ipcRoutes.transaction.get.default, selectedGroup._id, selectedAsset.ticker);
    }, [selectedAsset, selectedGroup])


    const handleChange = {
        assetSelect: (groupIndex, assetIndex) => {
            setGroupIndex(groupIndex);
            setAssetIndex(assetIndex);
            setSelectedGroup(groups[groupIndex]);
            setSelectedAsset(groups[groupIndex].assets[assetIndex]);
        }
    }

    const handleSubmit = {
        addAsset: (formData) => {
            IPC.send(ipcRoutes.groups.addAsset.default, formData);
        },
        createGroup: (groupName) => {
            IPC.send(ipcRoutes.groups.add.default, { name: groupName, assets: [] });
        },
        deleteGroup: (groupId) => {
            IPC.send(ipcRoutes.groups.delete.default, groupId);
        },
        arrangeGroup: (groupsPosition) => {
            IPC.send(ipcRoutes.groups.position.update.default, groupsPosition);
        },
        addTransaction: (formData) => {
            IPC.send(ipcRoutes.transaction.add.default, formData)
        }
    }

    const handleModal = {
        addAsset: (status) => {
            setShowAddAssetModal(status);
        },
        manageGroups: (status) => {
            setShowManageGroupsModal(status);
        },
        addTransaction: (status) => {
            setShowAddTransactionModal(status);
        }
    }

    const handleIPCResponse = {
        addGroupSuccess: () => {
            new window.Notification("Group Added", {
                body: "New group added successfully"
            });
            IPC.send(ipcRoutes.groups.get.default);
        },

        getGroupsSuccess: (e, response) => {
            setGroups(response);
        },

        deleteGroupSuccess: (e, response) => {
            new window.Notification("Group Deleted", {
                body: "The group and all asset under the group has deleted successfully"
            });
            IPC.send(ipcRoutes.groups.get.default);
        },
        addAssetSuccess: (e, response) => {
            new window.Notification("Asset Added to Group", {
                body: "Asset added to the group successfully"
            });
            IPC.send(ipcRoutes.groups.get.default);
        },
        positionUpdateSuccess: (e, response) => {
            IPC.send(ipcRoutes.groups.get.default);
        },
        addTransactionSuccess: (e, response) => {
            new window.Notification("Transaction Added", {
                body: "Transaction added successfully under the asset"
            });
            IPC.send(ipcRoutes.transaction.get.default, response.groupId, response.asset);
        },
        getTransactionSuccess: (e, response) => {
            setTransactions(response);
        }
    }


    return (
        <main>
            <Navbar selected={'holdings'} />
            <div className={wrapper.ThreeColumn}>
                <div className={wrapper.ThreeColumn__Left}>
                    <div className={styles.HoldingsHeader}>
                        <PageHeader>
                            <h1>Holdings</h1>
                            <p>Track your crypto moon bag</p>
                        </PageHeader>
                    </div>
                </div>
                <div className={[wrapper.ThreeColumn__Center, styles.HoldingsDetails].join(' ')}>
                    <AssetBar
                        groups={groups}
                        onPairSelect={handleChange.assetSelect}
                        groupIndex={groupIndex}
                        assetIndex={assetIndex}>
                    </AssetBar>

                    <AssetDetails
                        asset={groups[groupIndex].assets[assetIndex]}
                        transactions={transactions}
                        onClickAddTransaction={() => { handleModal.addTransaction(true) }}
                    ></AssetDetails>
                </div>
                <div className={[wrapper.ThreeColumn__Right].join(' ')}>
                    <ActionCard action={"Add now"} onClick={() => handleAddAssetModal(true)}>
                        <h4>Add Asset to Group</h4>
                        <p>Organise your assets into group to manage the transactions</p>
                    </ActionCard>

                    <ActionCard action={"Manage now"} onClick={() => handleManageGroupsModal(true)}>
                        <h4>Manage Groups</h4>
                        <p>Use groups like HODL, Invest and Degen to manage your assets</p>
                    </ActionCard>
                </div>
            </div>

            <Modal
                show={showManageGroupsModal}
                title={'Manage Groups'}
                onClose={() => handleModal.manageGroups(false)}>

                <ManageGroupForm
                    groups={groups}
                    onCreateGroupSubmit={handleSubmit.createGroup}
                    onDeleteGroup={handleSubmit.deleteGroup}
                    onArrangeGroup={handleSubmit.arrangeGroup}
                ></ManageGroupForm>
            </Modal>

            <Modal show={showAddAssetModal} title={'Add Asset to Group'} onClose={() => handleModal.addAsset(false)}>
                <div className={styles.HoldingsForm}>
                    <AddAssetForm
                        groups={groups}
                        onSubmit={handleSubmit.addAsset}
                        onCancel={() => handleModal.addAsset(false)}>
                    </AddAssetForm>
                </div>
            </Modal>

            <Modal show={showAddTransactionModal} title={'Add Transaction'} onClose={() => handleModal.addTransaction(false)}>
                <div className={styles.HoldingsForm}>
                    <AddTransactionForm
                        onSubmit={handleSubmit.addTransaction}
                        group={selectedGroup}
                        asset={selectedAsset}>
                    </AddTransactionForm>
                </div>
            </Modal>
        </main >
    );
}
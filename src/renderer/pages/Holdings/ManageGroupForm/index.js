import { useState } from "react";

import { TextInput } from "../../../components/TextInput";
import { Button } from "../../../components/Button";

import formstyles from "../../../shared_styles/form.modules.scss";
import styles from "./managegroupform.modules.scss";
import { Close, Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export const ManageGroupForm = ({
    groups,
    onCreateGroupSubmit,
    onDeleteGroup,
    onArrangeGroup
}) => {

    const [groupName, setGroupName] = useState();

    const handleGroupNameOnChange = (val) => { setGroupName(val) }

    const handleCreateGroupOnSubmit = (e) => {
        e.preventDefault();
        onCreateGroupSubmit(groupName);
        setGroupName('');
    }

    const handleDeleteGroup = (e, groupId) => {
        e.preventDefault();
        onDeleteGroup(groupId);
    }

    const handleMoveGroup = (e, groupId, pos) => {
        e.preventDefault();

        let groupsArray = groups.map(o => { return o._id });
        console.log("before: ", groupsArray);
        const index = groups.findIndex(o => o._id === groupId);
        if (pos === -1 && index !== 0) {
            const neighbourIndex = index - 1;
            [groupsArray[neighbourIndex], groupsArray[index]] = [groupsArray[index], groupsArray[neighbourIndex]]

            onArrangeGroup(groupsArray);
        } else if (pos === 1 && index !== groups.length - 1) {
            const neighbourIndex = index + 1;
            [groupsArray[index], groupsArray[neighbourIndex]] = [groupsArray[neighbourIndex], groupsArray[index]]

            onArrangeGroup(groupsArray);
        }
    }

    const renderGroupList = () => {
        return groups.map((o, index) => {
            return (
                <li className={styles.ManageGroupForm__GroupListItem} key={index}>
                    <p>{o.name}</p>
                    <KeyboardArrowUp
                        color={'primary'}
                        fontSize="small"
                        titleAccess="Move group up"
                        onClick={e => handleMoveGroup(e, o._id, -1)}
                    ></KeyboardArrowUp>
                    <KeyboardArrowDown
                        color={'primary'}
                        fontSize="small"
                        titleAccess="Move group down"
                        onClick={e => handleMoveGroup(e, o._id, 1)}
                    ></KeyboardArrowDown>
                    <Edit color={'primary'} fontSize="small" titleAccess="Edit group"></Edit>
                    <Close color="error" fontSize="small" titleAccess="Delete group" onClick={(e) => handleDeleteGroup(e, o._id)}></Close>
                </li>
            );
        })
    }

    return (
        <div className={styles.ManageGroupForm}>
            <div className={styles.ManageGroupForm__Section}>
                <ol className={styles.ManageGroupForm__GroupList}>
                    {renderGroupList()}
                </ol>
            </div>
            <div className={[styles.ManageGroupForm__Section, styles.ManageGroupForm__Section_Padded].join(' ')}>
                <div className={styles.ManageGroupForm__SectionTitle}>
                    <h3>Create New Group</h3>
                    <p className={formstyles.Form__LabelHelper}>
                        A group is similar to a sub section of portfolio where you can manage multiple assets.
                    </p>
                </div>
                <form className={formstyles.Form__Small} onSubmit={handleCreateGroupOnSubmit}>
                    <div className={formstyles.Form__Control}>
                        <div className={formstyles.Form__LabelWrap}>
                            <label className={formstyles.Form__Label}>Name</label>
                            {/* <p className={formstyles.Form__LabelHelper}>
                        A group
                    </p> */}
                        </div>
                        <TextInput placeholder={"eg: HODL, Degen"} value={groupName} onChange={handleGroupNameOnChange}></TextInput>
                    </div>

                    <div className={formstyles.Form__ButtonGroupStrech}>
                        <Button size="small" name={"Create"}></Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
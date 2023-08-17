import styles from "./assetbar.modules.scss";

const AssetGroup = ({
    name,
    assets,
    groupIndex,
    value = 100,
    onClick,
    selectAssetInGroup
}) => {
    const renderItems = () => {
        const isSelected = (index) => {
            return [
                styles.AssetGroup__ListItem,
                (selectAssetInGroup > -1 && selectAssetInGroup === index) ? styles.AssetGroup__ListItemSelected : null
            ].join(' ');
        }

        return assets.map((o, index) => {
            return <li className={isSelected(index)}
                key={index}
                onClick={() => handleOnClick(index)}>
                <p>{o.name}</p>
            </li>
        })
    };

    const handleOnClick = (assetIndex) => {
        onClick(groupIndex, assetIndex);
    }

    return (
        <div className={styles.AssetGroup}>
            <div className={styles.AssetGroup__Header}>
                <h4>{name}</h4>
                <p>Current Value: ${value}</p>
            </div>
            <ol className={styles.AssetGroup__List}>
                {renderItems()}
            </ol>
        </div>
    )
}

export const AssetBar = ({
    groups,
    onPairSelect,
    groupIndex,
    assetIndex
}) => {
    const renderAssetGroups = () => {
        if (!groups.length) {
            return (
                <div className={styles.AssetBar__Empty}>
                    <h2>No groups yet</h2>
                    <p>Add a new group</p>
                </div>
            );
        }

        return groups.map((o, index) => {
            return <AssetGroup
                name={o.name}
                assets={o.assets}
                key={index}
                groupIndex={index}
                onClick={onPairSelect}
                selectAssetInGroup={(groupIndex === index) ? assetIndex : -1}>
            </AssetGroup>
        })
    }

    return (
        <div className={styles.AssetBar}>
            {renderAssetGroups()}
        </div>
    )
}
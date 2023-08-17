import { Navbar } from "renderer/components/NavBar";
import { PageHeader } from 'renderer/components/PageHeader';
import wrapper from "../../shared_styles/container.modules.scss";
import styles from "./settings.modules.scss";

export const Settings = () => {
    return (
        <main>
            <Navbar selected={'settings'} />
            <div className={wrapper.ThreeColumn}>
                <div className={wrapper.ThreeColumn__Left}>
                    <div className={styles.SettingsHeader}>
                        <PageHeader>
                            <h1>Settings</h1>
                            <p>The control center to manage Invest Bruh</p>
                        </PageHeader>
                    </div>
                </div>
                <div className={wrapper.ThreeColumn__Center}>

                </div>
                <div className={wrapper.ThreeColumn__Right}></div>
            </div>
        </main>
    );
}
import { Navbar } from "renderer/components/NavBar";
import { PageHeader } from 'renderer/components/PageHeader';
import wrapper from "../../shared_styles/container.modules.scss";
import styles from "./trading.modules.scss";

export const Trading = () => {
    return (
        <main>
            <Navbar selected={'trading'} />
            <div className={wrapper.ThreeColumn}>
                <div className={wrapper.ThreeColumn__Left}>
                    <div className={styles.TradingHeader}>
                        <PageHeader>
                            <h1>Trading</h1>
                            <p>Track your crypto bag</p>
                        </PageHeader>
                    </div>
                </div>
                <div className={wrapper.ThreeColumn__Center}>
                    <div>
                        <h2>API Settings</h2>
                        <p>API settings are required to fetch realtime price data</p>
                    </div>
                </div>
                <div className={wrapper.ThreeColumn__Right}></div>
            </div>
        </main>
    );
}
import { useNavigate } from 'react-router';
import routes from 'renderer/constants/routes';
import styles from './navbar.modules.scss';
import Logo from '../../images/logo.png';

export const Navbar = ({ selected }) => {
    const navigate = useNavigate();

    const isSelected = (page) => {
        return (page === selected) ? styles.Navbar__Selected : '';
    }

    return (
        <nav>
            <img src={Logo} />
            <li className={isSelected('home')} onClick={() => { navigate(routes.HOME) }}>Home</li>
            <li className={isSelected('holdings')} onClick={() => { navigate(routes.HOLDINGS) }}>Holdings</li>
            <li className={isSelected('trading')} onClick={() => { navigate(routes.TRADING) }}>Trading</li>
            <li className={isSelected('cashflow')} onClick={() => { navigate(routes.CASHFLOW) }}>Cash Flow</li>
            <li className={[isSelected('settings'), styles.Navbar__Splitter].join(' ')} onClick={() => { navigate(routes.SETTINGS) }}>Settings</li>
        </nav>
    )
}
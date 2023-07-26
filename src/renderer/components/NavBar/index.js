import { useNavigate } from 'react-router';
import routes from 'renderer/constants/routes';
import styles from './navbar.modules.scss';

export const Navbar = ({ selected }) => {
    const navigate = useNavigate();

    const isSelected = (page) => {
        return (page === selected) ? styles.Navbar__Selected : '';
    }

    return (
        <nav>
            <li className={isSelected('home')} onClick={() => { navigate(routes.HOME) }}>Home</li>
            <li className={isSelected('cashflow')} onClick={() => { navigate(routes.CASHFLOW) }}>Cash Flow</li>
        </nav>
    )
}
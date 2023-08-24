import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../../../redux/auth-reducer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "./Header.module.css";

const Header = () => {
    let title = useAppSelector(state => state.header.title);
    let location = useLocation();
    const dispatch = useAppDispatch();

    const exit = () => {
        localStorage.removeItem('token');
        dispatch(logout());
    }

    return (
        <header className={"container " + styles.header}>
            <h2 className={styles.headerItem + " " + styles.headerTitle}>
                {title}
            </h2>
            {
                location.pathname === '/' || location.pathname === '/categories'
                ?   <>
                        <NavLink className={styles.navigationLink} to='/about'>
                            О компании
                        </NavLink>
                        <NavLink className={styles.navigationLink} to='/delivery'>
                            Страница доставки
                        </NavLink>
                        <NavLink className={styles.navigationLink} to='/banners'>
                            Баннеры
                        </NavLink>
                    </>
                : null
            }
            <button onClick={exit} className={styles.headerItem + " " + styles.exit}>
                <NavLink to='/'>Выйти</NavLink>
            </button>
        </header>
    )
}

export default Header;
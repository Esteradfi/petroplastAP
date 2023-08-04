import { logout } from "../../../redux/auth-reducer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
    let title = useAppSelector(state => state.header.title);
    const dispatch = useAppDispatch();

    const exit = () => {
        localStorage.removeItem('token');
        dispatch(logout());
    }

    return (
        <header className={styles.header}>
            <h2 className={styles.headerItem + " " + styles.headerTitle}>
                {title}
            </h2>
            <button onClick={exit} className={styles.headerItem + " " + styles.exit}>
                <NavLink to='/'>Выйти</NavLink> 
            </button>
        </header>
    )
}

export default Header;
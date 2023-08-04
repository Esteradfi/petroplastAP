import { Routes, Route } from "react-router-dom";
import logotype from "./../../assets/images/logo.png";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
    return (
        <section className={styles.AuthPage}>
            <article className={styles.logoBlock}>
                <img className={styles.logo} src={logotype} alt="Логотип" />
            </article>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/registration' element={<Registration />} />
                <Route path='/forgot' element={<ForgotPassword/>} />
            </Routes>
        </section>
    )
};

export default AuthPage;
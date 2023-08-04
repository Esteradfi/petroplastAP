import styles from "./../AuthPage.module.css";

const ForgotPassword = () => {
    return (
        <article>
            <p className={styles.formParagraph}>Пожалуйста, введите Ваш e-mail. Вы получите письмо со ссылкой для создания нового пароля</p>
            <form className={styles.rightForm}>
                <input className={styles.input} type="email" placeholder="Введите ваш e-mail" />
                <input type="submit" className={styles.longButton + " " + styles.grayButton + " " + styles.submitButton} value='Получить новый пароль' />
            </form>
        </article>
    )
};

export default ForgotPassword;
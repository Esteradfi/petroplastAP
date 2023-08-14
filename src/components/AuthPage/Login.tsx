import { SubmitHandler, useForm } from "react-hook-form";
import { AuthValues, postLoginThunk } from "../../redux/auth-reducer";
import { useAppDispatch } from "../../redux/hooks";
import logotype from "./../../assets/images/logo.png";
import styles from "./AuthPage.module.css";

const Login = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset
    } = useForm<AuthValues>();

    const onSubmit: SubmitHandler<AuthValues> = (data) => {
        dispatch<any>(postLoginThunk(data));
        reset({
            username: '',
            password: ''
        })
    }

    return (
        <section className={styles.AuthPage}>
            <article className={styles.logoBlock}>
                <img className={styles.logo} src={logotype} alt="Логотип" />
            </article>
            <h3 className={styles.title}>
                Войдите в личный кабинет
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputsBlock}>
                    <div className={styles.inputWrapper}>
                        <input className={styles.input} type="text" placeholder="Логин или e-mail" {...register('username', {
                            required: "Ошибка. Поле не заполнено"})} />
                            {errors?.username && <p className="errorMessage">{errors?.username?.message || "Ошибка заполнения"}</p>}
                    </div>
                    <div className={styles.inputWrapper}>
                        <input className={styles.input} type="password" placeholder="Пароль" {...register('password', {
                            required: "Ошибка. Поле не заполнено"})} />
                            {errors?.password && <p className="errorMessage">{errors?.password?.message || "Ошибка заполнения"}</p>}
                    </div>
                </div>
                <div className={styles.formRow}>
                    <input type="submit" disabled={!isValid} className={styles.shortButton + " " + styles.button + " " + styles.submitButton} value="Войти" />
                </div>
            </form>
        </section>
    )
};

export default Login;
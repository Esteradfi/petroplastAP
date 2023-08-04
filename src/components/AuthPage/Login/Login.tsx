import { NavLink } from "react-router-dom";
import styles from "./../AuthPage.module.css";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { postLoginThunk, AuthValues } from "../../../redux/auth-reducer";
import { useAppDispatch } from "../../../redux/hooks";

const Login = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        formState: {errors},
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
        <article>
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
                    <label htmlFor="remember" className={"custom-checkboxes " + styles.customCheckbox}>
                        <input type="checkbox" id="remember"/>
                        <span className="custom-checkboxes-span"></span>
                        <span className={styles.customCheckboxText}>Запомнить пароль</span>
                    </label>
                    <NavLink to="./forgot" className={styles.formLink}>Забыли пароль?</NavLink>
                </div>
                <div className={styles.formRow}>
                    <NavLink to="./registration" className={styles.formLink}>Зарегистрироваться</NavLink>
                    <input type="submit" className={styles.shortButton + " " + styles.grayButton + " " + styles.submitButton} value="Войти" />
                </div>    
            </form>   
        </article>
    )
};

export default Login;
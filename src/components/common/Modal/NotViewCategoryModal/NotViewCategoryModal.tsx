import { useAppDispatch } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";
import styles from "./../Modal.module.css";

const NotViewCategoryModal = () => {

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
    }

    return (
        <div>
            <h3 className={styles.title}>
                Перестать отображать категорию на главной странице?
            </h3>
            <p className={styles.paragraph}>
                Учтите, что данная категория <strong>пропадёт с главной страницы</strong>.
            </p>
            <div className={styles.buttons}>
                <button onClick={closeModal} className={styles.button + " " + styles.cancel}>
                    Отмена
                </button>
                <button className={styles.button + " " + styles.done}>
                    Продолжить
                </button>
            </div>
        </div>
    )
}

export default NotViewCategoryModal;
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";
import styles from "./../Modal.module.css";
import { clearAddCategoryDone } from "../../../../redux/categories-reducer";

const DoneCategoryModal = () => {

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
        dispatch(clearAddCategoryDone());
    }

    return (
        <div>
            <h3 className={styles.title}>
                Категория добавлена!
            </h3>
            <p className={styles.paragraph}>
                Категория добавлена и отобразится на сайте.
            </p>
            <div className={styles.buttons}>
                <button onClick={closeModal} className={styles.button + " " + styles.cancel}>
                    Отмена
                </button>
                <NavLink onClick={closeModal} to="/" className={styles.button + " " + styles.done}>
                    Продолжить
                </NavLink>
            </div>
        </div>
    )
}

export default DoneCategoryModal;
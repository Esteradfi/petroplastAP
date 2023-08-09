import { NavLink } from "react-router-dom";
import { clearEditCategoryDone } from "../../../../redux/categories-reducer";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";
import styles from "./../Modal.module.css";

const DoneEditCategoryModal = () => {

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
        dispatch(clearEditCategoryDone());
    }

    return (
        <div>
            <h3 className={styles.title}>
                Категория Обновлена!
            </h3>
            <p className={styles.paragraph}>
                Изменения добавлены и отобразятся на сайте.
            </p>
            <div className={styles.buttons}>
                <NavLink onClick={closeModal} to="/" className={styles.button + " " + styles.done}>
                    Продолжить
                </NavLink>
            </div>
        </div>
    )
}

export default DoneEditCategoryModal;
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";
import styles from "./../Modal.module.css";

const AddCategoryModal = () => {

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
    }

    return (
        <div>
            <h3 className={styles.title}>
                Добавить категорию?
            </h3>
            <p className={styles.paragraph}>
                При добавлении категории нужно будет ввести ее данные.
            </p>
            <div className={styles.buttons}>
                <button onClick={closeModal} className={styles.button + " " + styles.cancel}>
                    Отмена
                </button>
                <NavLink onClick={closeModal} className={styles.button + " " + styles.done} to="/newcategory">
                    Перейти
                </NavLink>
            </div>
        </div>
    )
}

export default AddCategoryModal;
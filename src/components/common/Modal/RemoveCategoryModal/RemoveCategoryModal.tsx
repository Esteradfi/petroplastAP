import { NavLink } from "react-router-dom";
import { clearSelectedImage, deleteCategoryThunk } from "../../../../redux/categories-reducer";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";
import styles from "./../Modal.module.css";

const RemoveCategoryModal = () => {

    const dispatch = useAppDispatch();
    let id = useAppSelector(state => state.modals.modalData.id);

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
    }

    const onRemoveCategory = () => {
        dispatch(deleteCategoryThunk(id));
        dispatch(clearSelectedImage());
        closeModal();
    }

    return (
        <div>
            <h3 className={styles.title}>
                Удалить категорию?
            </h3>
            <p className={styles.paragraph}>
                При удалении категории удаляются <strong>все товары</strong> в этой категории
            </p>
            <div className={styles.buttons}>
                <button onClick={closeModal} className={styles.button + " " + styles.cancel}>
                    Отмена
                </button>
                <NavLink to="/categories" onClick={onRemoveCategory} className={styles.button + " " + styles.done}>
                    Удалить
                </NavLink>
            </div>
        </div>
    )
}

export default RemoveCategoryModal;
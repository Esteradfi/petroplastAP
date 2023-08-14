import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeIsOpen, clearModals, setModalDataPath } from "../../../../redux/modals-window-reducer";
import styles from "./../Modal.module.css";

const AddProductModal = () => {
    let path = useAppSelector(state => state.modals.modalData.path);
    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
        dispatch(setModalDataPath(''));
    }

    return (
        <div>
            <h3 className={styles.title}>
                Добавить товар?
            </h3>
            <p className={styles.paragraph}>
                При добавлении товара необходимо ввести его характеристики. Товар появится в данной категории.
            </p>
            <div className={styles.buttons}>
                <button onClick={closeModal} className={styles.button + " " + styles.cancel}>
                    Отмена
                </button>
                <NavLink to={path + '/add'} onClick={closeModal} className={styles.button + " " + styles.done}>
                    Перейти
                </NavLink>
            </div>
        </div>
    )
}

export default AddProductModal;
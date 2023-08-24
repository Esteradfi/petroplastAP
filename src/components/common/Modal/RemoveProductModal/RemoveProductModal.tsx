import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeIsOpen, clearModals, setModalDataPath } from "../../../../redux/modals-window-reducer";
import { deleteProductThunk } from "../../../../redux/products-reducer";
import styles from "./../Modal.module.css";

const RemoveProductModal = () => {
    let category = useAppSelector(state => state.modals.modalData.category);
    const dispatch = useAppDispatch();
    let id = useAppSelector(state => state.modals.modalData.id);

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
    }

    const onRemoveProduct = () => {
        dispatch(deleteProductThunk(id));
        dispatch(setModalDataPath(''));
        closeModal();
    }

    return (
        <div>
            <h3 className={styles.title}>
                Удалить товар?
            </h3>
            <p className={styles.paragraph}>
                При удалении товара удаляются <strong>все его характеристики</strong>.
            </p>
            <div className={styles.buttons}>
                <button onClick={closeModal} className={styles.button + " " + styles.cancel}>
                    Отмена
                </button>
                <NavLink to={"/categories/" + category} onClick={onRemoveProduct} className={styles.button + " " + styles.done}>
                    Удалить
                </NavLink>
            </div>
        </div>
    )
}

export default RemoveProductModal;
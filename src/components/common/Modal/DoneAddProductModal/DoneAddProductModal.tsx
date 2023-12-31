import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";
import { clearAddProductDone, clearColors, clearSelectedImages } from "../../../../redux/products-reducer";
import styles from "./../Modal.module.css";

const DoneAddProductModal = () => {

    const category = useAppSelector(state => state.modals.modalData.id);


    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
        dispatch(clearAddProductDone());
        dispatch(clearColors());
        dispatch(clearSelectedImages());
    }

    return (
        <div>
            <h3 className={styles.title}>
                Товар добавлен!
            </h3>
            <p className={styles.paragraph}>
                Товар добавлен в категорию и отобразится на сайте.
            </p>
            <div className={styles.buttons}>
                <button onClick={closeModal} className={styles.button + " " + styles.cancel}>
                    Отмена
                </button>
                <NavLink to={'/categories/' + category} onClick={closeModal} className={styles.button + " " + styles.done}>
                    Продолжить
                </NavLink>
            </div>
        </div>
    )
}

export default DoneAddProductModal;
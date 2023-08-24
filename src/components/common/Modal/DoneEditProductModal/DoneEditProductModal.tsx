import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";
import { clearColors, clearEditProductDone, clearSelectedImages } from "../../../../redux/products-reducer";
import styles from "./../Modal.module.css";

const DoneEditProductModal = () => {

    const category = useAppSelector(state => state.modals.modalData.id);


    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
        dispatch(clearEditProductDone());
        dispatch(clearColors());
        dispatch(clearSelectedImages());
    }

    return (
        <div>
            <h3 className={styles.title}>
                Характеристики товара обновлены!
            </h3>
            <p className={styles.paragraph}>
                Изменения добавлены и отобразятся на сайте.
            </p>
            <div className={styles.buttons}>
                <NavLink to={'/categories/' + category} onClick={closeModal} className={styles.button + " " + styles.done}>
                    Продолжить
                </NavLink>
            </div>
        </div>
    )
}

export default DoneEditProductModal;
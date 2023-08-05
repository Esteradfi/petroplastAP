import { useAppDispatch } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";
import styles from "./../Modal.module.css";

const RemoveProductModal = () => {

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
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
                <button className={styles.button + " " + styles.done}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default RemoveProductModal;
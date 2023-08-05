import { useAppDispatch } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";
import styles from "./../Modal.module.css";

const AddProductModal = () => {

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
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
                <button className={styles.button + " " + styles.done}>
                    Перейти
                </button>
            </div>
        </div>
    )
}

export default AddProductModal;
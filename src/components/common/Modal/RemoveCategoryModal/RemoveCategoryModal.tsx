import { useAppDispatch } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";
import styles from "./../Modal.module.css";

const RemoveCategoryModal = () => {

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
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
                <button className={styles.button + " " + styles.done}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default RemoveCategoryModal;
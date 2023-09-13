import { useAppDispatch } from "../../../../redux/hooks";
import {changeIsDoneAddBanner, changeIsOpen, clearModals} from "../../../../redux/modals-window-reducer";
import styles from "./../Modal.module.css";
import {changeAddBannerDone, changeSelectedImage} from "../../../../redux/banners-reducer";

const DoneAddBannerModal = () => {

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
        dispatch(changeSelectedImage(''));
        dispatch(changeAddBannerDone(false));
    }

    return (
        <div>
            <h3 className={styles.title}>
                Баннер добавлен!
            </h3>
            <p className={styles.paragraph}>
                Баннер добавлен и отобразится на сайте.
            </p>
            <div className={styles.buttons}>
                <button onClick={closeModal} className={styles.button + " " + styles.done}>
                    Продолжить
                </button>
            </div>
        </div>
    )
}

export default DoneAddBannerModal;
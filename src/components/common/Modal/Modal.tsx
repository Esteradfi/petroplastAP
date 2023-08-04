import { useAppSelector } from "../../../redux/hooks";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
import styles from "./Modal.module.css";
import RemoveCategoryModal from "./RemoveCategoryModal/RemoveCategoryModal";

const Modal = () => {
    let modalType = useAppSelector(state => state.modals);
    return (
        <div className={styles.modalWindow}>
            {modalType.isAddCategory ? <AddCategoryModal /> : modalType.isRemoveCategory ? <RemoveCategoryModal /> : null}
        </div>
    )
}

export default Modal;
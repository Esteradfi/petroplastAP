import { useAppSelector } from "../../../redux/hooks";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
import DoneCategoryModal from "./DoneAddCategoryModal/DoneAddCategoryModal";
import DoneEditCategoryModal from "./DoneEditCategoryModal/DoneEditCategoryModal";
import styles from "./Modal.module.css";
import RemoveCategoryModal from "./RemoveCategoryModal/RemoveCategoryModal";

const Modal = () => {
    let modalType = useAppSelector(state => state.modals);
    return (
        <div className={styles.modalWindow}>
            {modalType.isAddCategory ? <AddCategoryModal /> : modalType.isRemoveCategory ? <RemoveCategoryModal /> : modalType.isDoneAddCategory ? <DoneCategoryModal /> : modalType.isDoneEditCategory ? <DoneEditCategoryModal /> : null}
        </div>
    )
}

export default Modal;
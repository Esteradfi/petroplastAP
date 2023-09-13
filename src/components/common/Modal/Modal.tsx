import {useAppSelector} from "../../../redux/hooks";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
import AddProductModal from "./AddProductModal/AddProductModal";
import DoneCategoryModal from "./DoneAddCategoryModal/DoneAddCategoryModal";
import DoneAddProductModal from "./DoneAddProductModal/DoneAddProductModal";
import DoneEditCategoryModal from "./DoneEditCategoryModal/DoneEditCategoryModal";
import DoneEditProductModal from "./DoneEditProductModal/DoneEditProductModal";
import styles from "./Modal.module.css";
import RemoveCategoryModal from "./RemoveCategoryModal/RemoveCategoryModal";
import RemoveProductModal from "./RemoveProductModal/RemoveProductModal";
import DoneAddBannerModal from "./DoneAddBanner/DoneAddBannerModal";

const Modal = () => {
    let modalType = useAppSelector(state => state.modals);
    return (
        <div className={styles.modalWindow}>
            {modalType.isAddCategory ? <AddCategoryModal/>
                : modalType.isRemoveCategory ? <RemoveCategoryModal/>
                    : modalType.isDoneAddCategory ? <DoneCategoryModal/>
                        : modalType.isDoneEditCategory ? <DoneEditCategoryModal/>
                            : modalType.isAddProduct ? <AddProductModal/>
                                : modalType.isDoneAddProduct ? <DoneAddProductModal/>
                                    : modalType.isRemoveProduct ? <RemoveProductModal/>
                                        : modalType.isDoneEditProduct ? <DoneEditProductModal/>
                                            : modalType.isDoneAddBanner ? <DoneAddBannerModal/>
                                                : null}
        </div>
    )
}

export default Modal;
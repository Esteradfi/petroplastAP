import styles from "./CategoriesListItem.module.css";
import { useAppDispatch } from "../../../redux/hooks";
import { changeIsOpen, changeIsRemoveCategory } from "../../../redux/modals-window-reducer";

const CategoriesListItem = ({...el}) => {
    const dispatch = useAppDispatch();

    const openRemoveCategoryModal = () => {
        dispatch(changeIsOpen(true));
        dispatch(changeIsRemoveCategory(true));
    }

    return (
        <div className={styles.item}>
            <img className={styles.image} src={el.image} alt="Категория" />
            <h3 className={styles.title}>
                {el.name}
            </h3>
            <div className={styles.buttons}>
                <button className={styles.button + " " + styles.edit}>
                    Редактировать
                </button>
                <button className={styles.button + " " + styles.remove} onClick={openRemoveCategoryModal}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default CategoriesListItem;
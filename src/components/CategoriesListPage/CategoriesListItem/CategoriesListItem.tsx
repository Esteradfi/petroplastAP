import styles from "./CategoriesListItem.module.css";
import { useAppDispatch } from "../../../redux/hooks";
import { changeIsOpen, changeIsRemoveCategory, setModalData } from "../../../redux/modals-window-reducer";
import { NavLink } from "react-router-dom";
import { setSelectedCategory } from "../../../redux/categories-reducer";

const CategoriesListItem = ({...el}) => {
    const dispatch = useAppDispatch();

    const openRemoveCategoryModal = () => {
        dispatch(setModalData(el._id));
        dispatch(changeIsOpen(true));
        dispatch(changeIsRemoveCategory(true));
    }

    const onEditCategoryButton = () => {
        const category = {
            checkbox: el.checkbox,
            name: el.name,
            image: el.image,
            _id: el._id,
            __v: el.__v,
        }
        dispatch(setSelectedCategory(category));
    }

    return (
        <div className={styles.item}>
            <img className={styles.image} src={el.image} alt="Категория" />
            <h3 className={styles.title}>
                {el.name}
            </h3>
            <div className={styles.buttons}>
                <NavLink to="/editcategory" onClick={onEditCategoryButton} className={styles.button + " " + styles.edit}>
                    Редактировать
                </NavLink>
                <button className={styles.button + " " + styles.remove} onClick={openRemoveCategoryModal}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default CategoriesListItem;
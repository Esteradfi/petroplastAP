import styles from "./CategoriesListPage.module.css"
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { changeTitle } from "../../redux/header-reducer";
import { changeIsAddCategory, changeIsOpen, changeIsRemoveCategory } from "../../redux/modals-window-reducer";

const CategoriesListPage = () => {
    const dispatch = useAppDispatch();

    const openAddCategoryModal = () => {
        dispatch(changeIsOpen(true));
        dispatch(changeIsAddCategory(true));
    }

    const openRemoveCategoryModal = () => {
        dispatch(changeIsOpen(true));
        dispatch(changeIsRemoveCategory(true));
    }

    useEffect(() => {
        dispatch(changeTitle('Категории товаров'));
    }, []);

    return (
        <article>
            <div className={styles.buttons}>
                <button className={styles.button + " " + styles.addButton} onClick={openAddCategoryModal}>
                    + Добавить категорию
                </button>
                <button className={styles.button + " " + styles.removeButton} onClick={openRemoveCategoryModal}>
                    Удалить все категории
                </button>
            </div>
        </article>
    )
}

export default CategoriesListPage;
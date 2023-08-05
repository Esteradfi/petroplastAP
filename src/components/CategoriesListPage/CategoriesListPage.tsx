import styles from "./CategoriesListPage.module.css"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeTitle } from "../../redux/header-reducer";
import { changeIsAddCategory, changeIsOpen } from "../../redux/modals-window-reducer";
import CategoriesListItem from "./CategoriesListItem/CategoriesListItem";
import { CategoriesItem, getCategoriesThunk } from "../../redux/categories-reducer";

const CategoriesListPage = () => {
    const dispatch = useAppDispatch();

    const openAddCategoryModal = () => {
        dispatch(changeIsOpen(true));
        dispatch(changeIsAddCategory(true));
    }


    useEffect(() => {
        dispatch(changeTitle('Категории товаров'));
    }, []);

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, []);

    let categories = useAppSelector(state => state.categories.categoriesList);

    let categoriesItems = categories.map((el: CategoriesItem) => <CategoriesListItem key={el._id} {...el} />)

    return (
        <article>
            {categoriesItems.length > 0 ? <div className={styles.listWrapper}>{categoriesItems}</div>
                    : <h2 className={styles.emptyTitle}>Категорий нет. Добавьте новые категории.</h2>}
            <div className={styles.buttons}>
                <button className={styles.button + " " + styles.addButton} onClick={openAddCategoryModal}>
                    + Добавить категорию
                </button>
                <button className={styles.button + " " + styles.removeButton}>
                    Удалить все категории
                </button>
            </div>
        </article>
    )
}

export default CategoriesListPage;
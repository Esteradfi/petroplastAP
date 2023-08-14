import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CategoriesItem, getCategoriesThunk } from "../../redux/categories-reducer";
import { changeTitle } from "../../redux/header-reducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeIsAddCategory, changeIsOpen } from "../../redux/modals-window-reducer";
import CategoriesListItem from "./CategoriesListItem/CategoriesListItem";
import styles from "./CategoriesListPage.module.css";

const CategoriesListPage = () => {
    const dispatch = useAppDispatch();
    let categories = useAppSelector(state => state.categories.categoriesList);

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



    let categoriesItems = categories.map((el: CategoriesItem) => <CategoriesListItem key={el._id} {...el} />)

    return (
        <article>
            <Navigate to="/categories" />
            {categoriesItems.length > 0 ? <div className={styles.listWrapper}>{categoriesItems}</div>
                    : <h2 className={styles.emptyTitle}>Категорий нет. Добавьте новые категории.</h2>}
            <div className={styles.buttons}>
                <button className={styles.button + " " + styles.addButton} onClick={openAddCategoryModal}>
                    + Добавить категорию
                </button>
            </div>
        </article>
    )
}

export default CategoriesListPage;
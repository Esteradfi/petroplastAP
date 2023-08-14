import { useEffect } from "react";
import { NavLink, Navigate, useLocation, useParams } from "react-router-dom";
import { changeTitle } from "../../../redux/header-reducer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { changeIsAddProduct, changeIsOpen, setModalDataPath } from "../../../redux/modals-window-reducer";
import { getProductsThunk } from "../../../redux/products-reducer";
import arrow from "./../../../assets/icons/arrow-right.svg";
import searchButton from "./../../../assets/icons/search.svg";
import styles from "./CategoryPage.module.css";
import ProductItem from "./ProductItem/ProductItem";


const CategoryPage = () => {
    const category = useParams();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const pathname = location.pathname;

    let categoriesList = useAppSelector(state => state.categories.categoriesList);
    const categoryIndex = categoriesList.findIndex(el => el.name === category.products);

    let productsList = useAppSelector(state => state.products.productsList);

    let productsItems = productsList.filter((el: any) => el.name === category.products).map((el: any) => <ProductItem key={el._id} {...el} />)

    useEffect(() => {
        dispatch(changeTitle(category.products || "Категория не найдена"));
    }, [category.products]);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, []);


    const openAddProductModal = () => {
        dispatch(changeIsOpen(true));
        dispatch(changeIsAddProduct(true));
        dispatch(setModalDataPath(pathname));
    }

    if(categoryIndex === -1) {
        return <Navigate to="/categories" />
    }

    return (
        <article>
            <div className={styles.breadcrumbsWrapper}>
                <div className={styles.breadcrumbs}>
                    <NavLink className={styles.breadcrumb} to="/categories">
                        Категории товаров
                    </NavLink>
                    <img className={styles.image} src={arrow} alt="Стрелка" />
                    <NavLink className={styles.breadcrumb} to={location.pathname}>
                        {category.products}
                    </NavLink>
                </div>
                <button className={styles.addButton} onClick={openAddProductModal}>
                    Добавить товар
                </button>
            </div>
            <div className={styles.productsSearchBlock}>
                <span className={styles.searchTitle}>
                    Товары этой категории
                </span>
                <div className={styles.searchInputBlock}>
                    <input placeholder="Поиск" type="text" className={styles.searchInput}/>
                    <button className={styles.searchButton}>
                        <img src={searchButton} alt="Искать" />
                    </button>
                </div>
            </div>
            <div className={styles.tableWrapper}>
            {productsList.length > 0 ? <div className={styles.listWrapper}>{productsItems}</div>
                    : <h2 className={styles.emptyTitle}>Товаров нет. Добавьте новые товары.</h2>}
            </div>
        </article>
    )
}

export default CategoryPage;
import { useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { changeTitle } from "../../../redux/header-reducer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { changeIsAddProduct, changeIsOpen, setModalDataPath } from "../../../redux/modals-window-reducer";
import { Product, changeSearch, changeViewProducts } from "../../../redux/products-reducer";
import arrow from "./../../../assets/icons/arrow-right.svg";
import searchButton from "./../../../assets/icons/search.svg";
import styles from "./CategoryPage.module.css";
import ProductItem from "./ProductItem/ProductItem";


const CategoryPage = () => {
    const category = useParams();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    let search = useAppSelector(state => state.products.search);
    let productsView = useAppSelector(state => state.products.viewProductsList);


    let productsList = useAppSelector(state => state.products.productsList);

    let productsItems = productsList.filter((el: Product) => el.category === category.products).map((el: any) => <ProductItem key={el._id} {...el} />)
    let productsViewItems = productsView.filter((el: Product) => el.category === category.products).map((el: any) => <ProductItem key={el._id} {...el} />)

    useEffect(() => {
        dispatch(changeTitle(category.products || "Категория не найдена"));
    }, [category.products]);

    useEffect(() => {
        dispatch(changeSearch(''));
        dispatch(changeViewProducts(productsList));
    }, []);


    const openAddProductModal = () => {
        dispatch(changeIsOpen(true));
        dispatch(changeIsAddProduct(true));
        dispatch(setModalDataPath(pathname));
    }

    function searchProducts(searchQuery: string) {
        let newProductsList = productsList.filter((product: Product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.article.toLowerCase().includes(searchQuery.toLowerCase())
        );
        dispatch(changeViewProducts(newProductsList));
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearch(e.target.value));
        searchProducts(e.target.value);
    }

    return (
        <article>
            <div>
                <div className={"container " + styles.breadcrumbsWrapper}>
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
                        <input onChange={onSearch} value={search} placeholder="Поиск" type="text" className={styles.searchInput}/>
                        <button className={styles.searchButton}>
                            <img src={searchButton} alt="Искать" />
                        </button>
                    </div>
                </div>
            </div>
            {
                productsItems.length > 0
                ?   <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr>
                                <th>Название</th>
                                <th>Артикул</th>
                                <th>Фото</th>
                                <th>Штрихкод индивидуальный</th>
                                <th>Штрихкод групповой</th>
                                <th>Ёмкость</th>
                                <th>Габариты изделия (ДхШхВ)</th>
                                <th>Габариты упаковки (ДхШхВ)</th>
                                <th>Вес нетто <br/> Вес брутто</th>
                                <th>Цена за шт. / пак</th>
                                <th>Кол-во шт. в упаковке</th>
                                <th>Остаток на складе (шт.)</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {productsViewItems}
                        </tbody>
                    </table>
                    </div>
                : <h2 className={styles.emptyTitle}>Товаров нет. Добавьте новые товары.</h2>
            }
        </article>
    )
}

export default CategoryPage;
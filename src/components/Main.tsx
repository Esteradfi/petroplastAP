import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getCategoriesThunk } from "../redux/categories-reducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProductsThunk } from "../redux/products-reducer";
import AboutPage from "./AboutPage/AboutPage";
import AddCategoryPage from "./AddCategoryPage/AddCategoryPage";
import BannersPage from "./BannersPage/BannersPage";
import CategoriesListPage from "./CategoriesListPage/CategoriesListPage";
import AddProductPage from "./CategoriesListPage/CategoryPage/AddProductPage/AddProductPage";
import CategoryPage from "./CategoriesListPage/CategoryPage/CategoryPage";
import EditProductPage from "./CategoriesListPage/CategoryPage/EditProductPage/EditProductPage";
import DeliveryPage from "./DeliveryPage/DeliveryPage";
import EditCategoryPage from "./EditCategoryPage/EditCategoryPage";
import Header from "./common/Header/Header";
import ScrollToTop from "./common/ScrollToTop/ScrollToTop";
import {getBannersThunk} from "../redux/banners-reducer";

const Main = () => {
    let isAuth = useAppSelector(state => state.auth.isAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCategoriesThunk());
        dispatch(getProductsThunk());
        dispatch(getBannersThunk());
    }, []);


    return (
        <main>
              <ScrollToTop>
                <section>
                {isAuth && <Header />}
                  <Routes>
                      <Route path='/' element={<CategoriesListPage />} />
                      <Route path='/categories' element={<CategoriesListPage />} />
                      <Route path='/categories/:products' element={<CategoryPage />} />
                      <Route path='/categories/:products/add' element={<AddProductPage />} />
                      <Route path='/categories/:products/edit' element={<EditProductPage />} />
                      <Route path='/newcategory' element={<AddCategoryPage />} />
                      <Route path='/editcategory' element={<EditCategoryPage />} />
                      <Route path='/banners' element={<BannersPage />} />
                      <Route path='/about' element={<AboutPage />} />
                      <Route path='/delivery' element={<DeliveryPage />} />
                  </Routes>
                </section>
              </ScrollToTop>
            </main>
    )
}

export default Main;
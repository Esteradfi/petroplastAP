import React, { useEffect } from 'react';
import './App.css';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header/Header';
import CategoriesListPage from './components/CategoriesListPage/CategoriesListPage';
import AddCategoryPage from './components/AddCategoryPage/AddCategoryPage';
import EditCategoryPage from './components/EditCategoryPage/EditCategoryPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { changeIsOpen, clearModals } from './redux/modals-window-reducer';
import Modal from './components/common/Modal/Modal';
import { checkToken } from './redux/auth-reducer';
import Login from './components/AuthPage/Login';

function App() {
  let isAuth = useAppSelector(state => state.auth.isAuth);
  let isModalOpen = useAppSelector(state => state.modals.isOpen);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(changeIsOpen(false));
    dispatch(clearModals());
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(checkToken());
    }
  }, []);

  if(!isAuth) {
    return (
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    )
  }

  return (
    <div className={isModalOpen ? "App AppOverlay" : "App"}>
      {isModalOpen && <div className="overlay" onClick={closeModal}></div>}
      {isModalOpen && <Modal />}
        <main>
          <ScrollToTop>
            <section className="container">
            {isAuth && <Header />}
              <Routes>
                  <Route path='/' element={<CategoriesListPage />} />
                  <Route path='/newcategory' element={< AddCategoryPage />} />
                  <Route path='/editcategory' element={<EditCategoryPage />} />
              </Routes>
            </section>
          </ScrollToTop>
        </main>
    </div>
  );
}

export default App;

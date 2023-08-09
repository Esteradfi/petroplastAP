import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddCategoryPage from './components/AddCategoryPage/AddCategoryPage';
import Login from './components/AuthPage/Login';
import CategoriesListPage from './components/CategoriesListPage/CategoriesListPage';
import EditCategoryPage from './components/EditCategoryPage/EditCategoryPage';
import Header from './components/common/Header/Header';
import Modal from './components/common/Modal/Modal';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import { checkToken, logout } from './redux/auth-reducer';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { changeIsOpen, clearModals } from './redux/modals-window-reducer';

function App() {
  let isAuth = useAppSelector(state => state.auth.isAuth);
  let isModalOpen = useAppSelector(state => state.modals.isOpen);
  const dispatch = useAppDispatch();


  const closeModal = () => {
    dispatch(changeIsOpen(false));
    dispatch(clearModals());
  }

  if(localStorage.getItem('token') && +new Date() <= +(localStorage.getItem('blockTime') || 0)) {
    dispatch(checkToken());
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
                      <Route path='/newcategory' element={<AddCategoryPage />} />
                      <Route path='/editcategory' element={<EditCategoryPage />} />
                  </Routes>
                </section>
              </ScrollToTop>
            </main>
        </div>
    );
  } else {
    localStorage.clear();
    dispatch(logout());
    return (
      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/newcategory' element={<Login />} />
          <Route path='/editcategory' element={<Login />} />
        </Routes>
      </main>
    )
  }
}

export default App;

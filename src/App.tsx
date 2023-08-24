import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/AuthPage/Login';
import Main from "./components/Main";
import Modal from './components/common/Modal/Modal';
import { checkToken, logout } from './redux/auth-reducer';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { changeIsOpen, clearModals } from './redux/modals-window-reducer';

function App() {
  let isModalOpen = useAppSelector(state => state.modals.isOpen);
  let isAuth = useAppSelector(state => state.auth.isAuth);
  const dispatch = useAppDispatch();


  const closeModal = () => {
    dispatch(changeIsOpen(false));
    dispatch(clearModals());
  }

  useEffect(() => {

  },[isAuth])

  if(localStorage.getItem('token') && +new Date() <= +(localStorage.getItem('blockTime') || 0)) {
    dispatch(checkToken());
    return (
      <div className={isModalOpen ? "App AppOverlay" : "App"}>
          {isModalOpen && <div className="overlay" onClick={closeModal}></div>}
          {isModalOpen && <Modal />}
          <Main />
        </div>
    );
  } else {
    localStorage.clear();
    dispatch(logout());
    return (
      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/categories' element={<Login />} />
          <Route path='/categories/:products' element={<Login />} />
          <Route path='/categories/:products/add' element={<Login />} />
          <Route path='/categories/:products/edit' element={<Login />} />
          <Route path='/newcategory' element={<Login />} />
          <Route path='/editcategory' element={<Login />} />
          <Route path='/banners' element={<Login />} />
          <Route path='/about' element={<Login />} />
          <Route path='/delivery' element={<Login />} />
        </Routes>
        <Navigate to="/" />
      </main>
    )
  }
}

export default App;

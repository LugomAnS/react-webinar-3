import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useInit from '../hooks/use-init';
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import useStore from '../hooks/use-store';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  useInit(async () => {
    await store.actions.user.initUser();
  }, [], true)

  const select = useSelector(state => ({
    auth: state.user.auth,
    id: state.user.user._id,
    token: state.user.token,
  }))

  useEffect(() => {
    store.actions.profile.setParams(select.id, select.token);
  }, [select.auth])

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login />}/>
        <Route path={'/profile'} element={<Profile />} />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;

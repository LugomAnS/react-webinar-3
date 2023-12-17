import { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import UserBar from '../../containers/user-bar';
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../components/login-form";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";


function Login() {
  const store = useStore();
  const navigation = useNavigate();

  useInit(() => {
    store.actions.user.resetErrors();
  }, [])

  const select = useSelector(state => ({
    error: state.user.serverError,
    waiting: state.user.waiting,
    auth: state.user.auth,
    id: state.user.user._id,
    token: state.user.token,
  }))

  useEffect(() => {
    if(select.auth) {
      store.actions.profile.setParams(select.id, select.token);
      navigation('/profile');
    }
  }, [select.auth])

  const {t} = useTranslate();

  const callbacks = {
    loginUser: useCallback((username, password) => store.actions.user.login(username, password), [store]),
  }
  return(
    <PageLayout>
      <UserBar />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <LoginForm t={t} log={callbacks.loginUser} error={select.error}/>
      </Spinner>
    </PageLayout>
  )
};

export default memo(Login);
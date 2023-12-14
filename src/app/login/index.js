import { memo, useCallback } from "react";
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


function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    error: state.user.serverError,
    waiting: state.user.waiting,
  }))

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
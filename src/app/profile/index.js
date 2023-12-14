import { memo, useEffect } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import UserBar from "../../containers/user-bar";
import useTranslate from "../../hooks/use-translate";
import ProfileCard from "../../components/profile-card";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import { useNavigate } from "react-router-dom";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.user.tokenAuthorization()
  }, [], true)

  const select = useSelector(state => ({
    user: state.user.user,
    waiting: state.user.waiting,
    error: state.user.serverError,
    token: state.user.token,
  }));

  useEffect(() => {
    if(select.error || select.token === null) {
      navigate('/login');
    }
  }, [select])

  const {t} = useTranslate();
  return (
    <PageLayout>
      <UserBar />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard t={t} user={select.user}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
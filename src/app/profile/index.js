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
import Authorization from "../../containers/authorization";

function Profile() {
  const store = useStore();

  useInit(() => {
    console.log("aut");
    console.log(store);
    store.actions.profile.loadProfile();
  }, [])

  const select = useSelector(state => ({
    profile: state.profile.profile,
    waiting: state.profile.waiting,
  }));

  const {t} = useTranslate();
  return (
    <PageLayout>
      <Authorization />
      <UserBar />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard t={t} profile={select.profile}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
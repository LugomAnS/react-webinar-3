import { memo, useCallback } from "react";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import UserTool from "../../components/user-tool";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function UserBar() {
  const store = useStore();
  const {t} = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    name: state.user.user?.profile,
  }));

  const callbacks = {
    onLogin: useCallback(() => navigate('/login'), []),
    onLogout: useCallback(() => store.actions.user.logout(), [store]),
  }
  return (
    <SideLayout side='end' padding='medium'>
      <UserTool t={t} login={callbacks.onLogin} logout={callbacks.onLogout}
                name={!!select.name ? select.name.name : null } link={'/profile'}/>
    </SideLayout>
  )
}

export default memo(UserBar);
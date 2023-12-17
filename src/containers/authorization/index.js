import { memo, useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function Authorization() {
  const navigate = useNavigate();
  const select = useSelector(state => ({
    auth: state.user.auth,
    waiting: state.user.wa
  }));

  useEffect(() => {
    if(!select.auth) {
      navigate('/login');
    }
  }, [select.auth])

  return (
    <>
    </>
  );
}

export default memo(Authorization);
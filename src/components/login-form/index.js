import { memo, useState } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm({error, log, t}) {
  const cn = bem('LoginForm');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onLoginChange = (event) => setLogin(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const callbacks = {
    onLogin: () => log(login, password),
  }
  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('login.title')}</div>
      <div className={cn('input')}>
        <label>{t('login.login')}</label>
        <input type="text" value={login} onChange={onLoginChange}/>
      </div>
      <div className={cn('input')}>
        <label>{t('login.password')}</label>
        <input type="password" value={password} onChange={onPasswordChange}/>
      </div>
      {error && <div className={cn('error')}>{error}</div>}
      <button onClick={callbacks.onLogin} >{t('enter')}</button>
    </div>
  )
};

LoginForm.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func,
  t: PropTypes.func
};

LoginForm.defaultProps = {
  login: () => {},
  t: (text) => text
}

export default memo(LoginForm);
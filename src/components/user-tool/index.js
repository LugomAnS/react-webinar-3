import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";

function UserTool(props) {
  const callbacks = {
    onLogin: () => props.login(),
    onLogout: () => props.logout(),
  }
  return (
    <div className="UserTool">
      {props.name ? (
        <>
          <Link to={props.link}>{props.name}</Link>
          <button onClick={callbacks.onLogout}>{props.t('logout')}</button>
        </>
      ): (
        <button onClick={callbacks.onLogin}>{props.t('login')}</button>
      )}
    </div>
  )
}

UserTool.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  logout: PropTypes.func,
  login: PropTypes.func,
  t: PropTypes.func
};

UserTool.defaultProps = {
  logout: () => {},
  login: () => {},
  t: (text) => text
}

export default memo(UserTool)
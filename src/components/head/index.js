import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, locale, changeLanguage}) {

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className="Toogle">
        <button onClick={() => changeLanguage("ru")} disabled={locale === "ru"}>Русский</button>
        <button onClick={() => changeLanguage("en")} disabled={locale === "en"}>English</button>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  locale: PropTypes.string,
  changeLanguage: PropTypes.func,
};

Head.defaultTypes = {
  changeLanguage: () => {},
}

export default memo(Head);

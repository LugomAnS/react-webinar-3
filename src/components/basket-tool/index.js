import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function BasketTool({sum, amount, onOpen, language}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to="/" className={cn('main')}>
        {language.buttons.main}
      </Link>
      <div>
        <span className={cn('label')}>{language.titles.inCart}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: language.locale === "ru" ? 'товар' : 'product',
              few: language.locale === "ru" ? 'товара' : 'products',
              many: language.locale === "ru" ? 'товаров' : 'products'
            })} / ${numberFormat(sum)} ₽`
            : `${language.titles.empty}`
          }
        </span>
        <button onClick={onOpen}>{language.buttons.cart}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.shape({
    locale: PropTypes.string,
    titles: PropTypes.shape({
      inCart: PropTypes.string,
      empty: PropTypes.string,
    }),
    buttons: PropTypes.shape({
      main: PropTypes.string,
      cart: PropTypes.string,
    }),
  })
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);

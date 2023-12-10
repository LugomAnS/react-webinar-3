import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

function NavigationItem(props) {
  return (
    <Link to={props.route} className="NavigationItem">
      {props.title}
    </Link>
  );
}

NavigationItem.propsTypes = {
  title: PropTypes.string,
  route: PropTypes.string,
};

export default memo(NavigationItem)
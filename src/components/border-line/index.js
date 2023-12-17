import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function BorderLine({width}) {
  const cn = bem('BorderLine');
  return (
    <div className={cn({width})}/>
  );
}

BorderLine.propsTypes = {
  width: PropTypes.oneOf(['thin', 'medium', 'bold'])
};

BorderLine.defaultProps = {};

export default memo(BorderLine);
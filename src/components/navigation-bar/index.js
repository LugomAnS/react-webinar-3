import PropTypes from 'prop-types';
import React, { memo } from "react";
import './style.css';

function NavigationBar(props) {
  return (
    <div className='NavigationBar'>
      {props.children}
    </div>
  );
}

NavigationBar.propsTypes = {
  children: PropTypes.node
};

export default memo(NavigationBar);
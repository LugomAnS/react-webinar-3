import PropTypes from "prop-types";
import React, { memo } from "react";
import './style.css';

function Section(props) {
  return (
    <div className="Section">
      {props.children}
    </div>
  );
}

Section.propsTypes = {
  children: PropTypes.node,
}

export default memo(Section)
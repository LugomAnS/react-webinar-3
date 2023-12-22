import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function MiddleLayout({children}) {
  const cn = bem('MiddleLayout');
  return (
    <div className={cn()}>
      {React.Children.map(children, (child) => (
        <div key={child.key}>{child}</div>
      ))}
    </div>
  );
}

MiddleLayout.propTypes = {
  children: PropTypes.node,
}

MiddleLayout.defaultProps = {};

export default memo(MiddleLayout);
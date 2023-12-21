import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function FullLayout({children}) {
  const cn = bem('FullLayout');
  return (
    <div className={cn()}>
      {React.Children.map(children, (child) => (
        <div key={child.key}>{child}</div>
      ))}
    </div>
  );
}

FullLayout.propTypes = {
  children: PropTypes.node,
}

FullLayout.defaultProps = {};

export default memo(FullLayout);
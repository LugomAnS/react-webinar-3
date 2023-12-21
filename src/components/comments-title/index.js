import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentsTitle({count}) {
  return (
    <div className="CommentsTitle">
      {`Комментарии (${count})`}
    </div>
  );
}

CommentsTitle.propsTypes = {
  count: PropTypes.number,
};

CommentsTitle.defaultProps = {};

export default memo(CommentsTitle);
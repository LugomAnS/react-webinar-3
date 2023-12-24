import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentsTitle({count, t}) {
  return (
    <div className="CommentsTitle">
      {`${t('comments.title')} (${count})`}
    </div>
  );
}

CommentsTitle.propsTypes = {
  count: PropTypes.number,
  t: PropTypes.func,
};

CommentsTitle.defaultProps = {
  t: () => {},
};

export default memo(CommentsTitle);
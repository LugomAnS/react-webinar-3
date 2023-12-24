import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

function CommentsRequest(props) {
  return (
    <div className="CommentsRequest">
        <Link to={props.link.path} state={{back: props.link.from}}>{props.t('comments.enter')}</Link><span>{`, ${props.title}`}</span>
    </div>
  );
}

CommentsRequest.propTypes = {
  link: PropTypes.shape({
    path: PropTypes.string,
    from: PropTypes.string,
  }),
  t: PropTypes.func,
};

CommentsRequest.defaultProps = {
  t: () => {},
};

export default memo(CommentsRequest);
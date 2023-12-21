import { memo } from "react";
import { Link } from "react-router-dom";
import './style.css';

function CommentsRequest(props) {
  return (
    <div className="CommentsRequest">
      <div className="CommentsRequest-line"><Link to={props.link.path} state={{back: props.link.from}}>Войдите</Link>{`, ${props.title}`}</div>
    </div>
  );
}

export default memo(CommentsRequest);
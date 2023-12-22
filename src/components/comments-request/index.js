import { memo } from "react";
import { Link } from "react-router-dom";
import './style.css';

function CommentsRequest(props) {
  return (
    <div className="CommentsRequest">
        <Link to={props.link.path} state={{back: props.link.from}}>Войдите</Link><span>{`, ${props.title}`}</span>
    </div>
  );
}

export default memo(CommentsRequest);
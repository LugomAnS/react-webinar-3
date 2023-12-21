import { memo } from "react";
import './style.css';
import CommentItem from "../comment-item";

function CommentsList(props) {
  const callbacks = {
    onReply: (id) => props.reply(id),
    onSend: (text) => props.send(text),
    onCancel: () => props.cancel(),
  }

  return (
    <div className="CommentsList">
      {props.data.map(item =>
        <CommentItem  key={item._id} item={item} replyId={props.replyId} selfId={props.selfId}
                      reply={callbacks.onReply} send={callbacks.onSend} cancel={callbacks.onCancel}
                      link={props.link} exists={props.exists} />
      )}
    </div>
  );
}

export default memo(CommentsList);
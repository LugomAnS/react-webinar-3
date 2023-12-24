import { memo } from "react";
import Comment from "../comment";
import CommentForm from '../comment-form';
import PropTypes from 'prop-types';
import './style.css';

function CommentItem(props) {

  const callbacks = {
    onReply: (id) => props.reply(id),
    onSend: (text) => props.send(text),
    onCancel: () => props.cancel(),
  }

  const child = props.depth < 15 ? "CommentItem-child" : "";

  return (
    <div>
      <Comment item={props.item} reply={callbacks.onReply} selfId={props.selfId} t={props.t} />
      <div className={child}>
        {props.item.children.length > 0 && props.item.children.map(item =>
          <CommentItem key={item._id} item={item} reply={callbacks.onReply}
                       replyId={props.replyId} send={callbacks.onSend}
                       link={props.link} exists={props.exists}
                       cancel={callbacks.onCancel} selfId={props.selfId} t={props.t} depth={props.depth + 1}
          />
        )}
      </div>
      <div id={props.item._id}/>
      {props.replyId === props.item._id &&
      <div className={child}>
        <CommentForm titleForm={props.t('comments.answer')} titleAuth={props.t('comments.answerpos')}
                                                        send={callbacks.onSend}
                                                        cancel={callbacks.onCancel}
                                                        link={props.link}
                                                        exists={props.exists}
                                                        t={props.t}/>
      </div>}
    </div>
  );
}

CommentItem.propTypes = {
  depth: PropTypes.number,
  selfId: PropTypes.string,
  replyId: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      })
    }),
    children: PropTypes.array,
  }),
  t: PropTypes.func,
  cancel: PropTypes.func,
  reply: PropTypes.func
};



export default memo(CommentItem);
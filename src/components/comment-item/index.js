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

  return (
    <div>
      <Comment item={props.item} reply={callbacks.onReply} selfId={props.selfId} t={props.t}/>
      <div className="CommentItem-child">
        {props.item.children.length > 0 && props.item.children.map(item =>
          <CommentItem key={item._id} item={item} reply={callbacks.onReply}
                       replyId={props.replyId} send={callbacks.onSend}
                       link={props.link} exists={props.exists}
                       cancel={callbacks.onCancel} selfId={props.selfId} t={props.t}
          />
        )}
      </div>
      {props.replyId === props.item._id &&
      <div className="CommentItem-child">
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
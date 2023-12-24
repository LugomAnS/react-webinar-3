import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css'

function Comment(props) {
  const cn = bem("Comment");
  // заглушка
  //@todo привести дату в формат по дизайну
  // const date = new Date(props.item.dateCreate);
  // const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  // const formattedDate = date.toLocaleString('ru-RU', options);

  const callbacks = {
    onReply: () => props.reply(props.item._id),
  }
  const user = props.item.author._id === props.selfId ? "self" : "user";
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <div className={cn(user)}>{props.item.author.profile.name}</div>
        <div className={cn('date')}>{props.item.dateCreate}</div>
      </div>
      <div className={cn('text')}>{props.item.text}</div>
      <button className={cn('button')} onClick={callbacks.onReply}>{props.t('comments.reply')}</button>
    </div>
  );
}

Comment.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string,
      })
    })
  }),
  reply: PropTypes.func,
  t: PropTypes.func,
};

Comment.defaultProps = {
  t: () => {},
  reply: () => {},
};


export default memo(Comment);
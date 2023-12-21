import { memo, useState } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css'
import CommentsRequest from "../comments-request";

function CommentForm(props) {
  const cn = bem('CommentsForm');
  const [value, setValue] = useState('');

  const callbacks = {
    onChange: (e) => setValue(e.target.value),
    onSend: () => props.send(value),
    onCancel: () => props.cancel(),
  }
  return (
    <div>
      {props.exists &&
      <div className={cn()}>
        <div className={cn('title')}>{`Новый ${props.titleForm}`}</div>
        <textarea className={cn('field')} rows={4} placeholder="Текст"
                  value={value} onChange={callbacks.onChange}
        />
        <div>
          <button className={cn('button')} onClick={callbacks.onSend}>Отправить</button>
          {props.cancel && <button className={cn('button')} onClick={callbacks.onCancel}>Отменить</button>}
        </div>
      </div>}
      {!props.exists &&
      <div className={cn('auth')}>
        <CommentsRequest
          title={props.titleAuth}
          link={props.link}/> {props.cancel && <div className={cn('cancel')} onClick={callbacks.onCancel}>Отмена</div>}
      </div>}
    </div>
  );
}

CommentForm.propTypes = {
  titleAuth: PropTypes.string,
  titleForm: PropTypes.string,
  exists: PropTypes.bool,
  send: PropTypes.func,
  cancel: PropTypes.func,
};

CommentForm.defaultProps = {
  send: () => {},
};

export default memo(CommentForm)
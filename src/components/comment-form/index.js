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
        <div className={cn('title')}>{props.titleForm}</div>
        <textarea className={cn('field')} rows={4} placeholder={props.t('comments.placeholder')}
                  value={value} onChange={callbacks.onChange}
        />
        <div>
          <button className={cn('button')} onClick={callbacks.onSend}>{props.t('comments.send')}</button>
          {props.cancel && <button className={cn('button')} onClick={callbacks.onCancel}>{props.t('comments.cancel')}</button>}
        </div>
      </div>}
      {!props.exists &&
      <div className={cn('auth')}>
        <CommentsRequest
          t={props.t}
          title={props.titleAuth}
          link={props.link}/> {props.cancel && <div className={cn('cancel')}
                                                    onClick={callbacks.onCancel}>{props.t("comments.cancel")}</div>}
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
  t: PropTypes.func,
};

CommentForm.defaultProps = {
  t: () => {},
  send: () => {},
};

export default memo(CommentForm)
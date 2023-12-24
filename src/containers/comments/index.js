import { memo, useCallback, useEffect, useRef, useState } from "react";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";
import CommentItem from "../../components/comment-item";
import CommentsTitle from "../../components/comments-title";
import CommentForm from "../../components/comment-form";
import commentAction from '../../store-redux/comment/actions';
import commentsListAction from '../../store-redux/comments-list/actions';
import useInit from '../../hooks/use-init';
import { useDispatch, useSelector as useSelectorRedux} from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import listToTree from '../../utils/list-to-tree/index';
import FullLayout from '../../components/full-layout';
import parseDate from "../../utils/date-format";
import MiddleLayout from "../../components/middle-layout";
import useTranslate from "../../hooks/use-translate";

function Comments() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [replyId, setReplyId] = useState(id);
  const {t} = useTranslate();
  const [commentsList, setCommentsList] = useState([]);

  useInit(() => {
    dispatch(commentsListAction.loadList(id));
  }, [id]);

  const select = useSelector(state => ({
    exists: state.session.exists,
    selfId: state.session.user._id,
  }));

  const selectRedux = useSelectorRedux(state => ({
    commentWait: state.comment.waiting,
    comData: state.comment.data,
    error: state.comment.error,
    list: state.commentsList.list,
    listLoading: state.commentsList.waiting
  }));

  const location = useLocation();
  const link = {
    path: "/login",
    from: location.pathname,
  }

  const callbacks = {
    // отправка комментария
    uploadComment: useCallback(data => {
      if(!!data.trim()) {
        const comment = {
          _id: "",
          text: data,
          parent: {
            _id: replyId,
            _type: id === replyId ? "article" : "comment",
          }
        }
        dispatch(commentAction.upload(comment));
        setReplyId(id);
      }
    }, [replyId]),

    // выбор кому отвечать
    reply: useCallback((id) => {
      setReplyId(id);
      const item =  document.getElementById(id);
      item?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }, []),

    // отмена ответа
    cancel: useCallback(() => setReplyId(id), [])
  }

  useEffect(() => {
    if(selectRedux.list?.items?.length > 0)
      setCommentsList(listToTree(parseDate(selectRedux.list.items, 'dateCreate'))[0].children);
  }, [selectRedux.list])

  useEffect(() => {
    if(!selectRedux.commentWait && !!selectRedux.comData) {
      dispatch({type: "commentsList/add-comment", payload: {data: selectRedux.comData}});
      dispatch({type: "comment/reset"});
    }
  }, [selectRedux.comData])

  return (
    <Spinner active={selectRedux.listLoading}>
      <CommentsTitle count={selectRedux.list.count || 0} t={t}/>

      {selectRedux.list?.items?.length > 0 &&
        <MiddleLayout>
        {commentsList.map(item =>
        <CommentItem  key={item._id} item={item} replyId={replyId} selfId={select.selfId}
                      reply={callbacks.reply} send={callbacks.uploadComment} cancel={callbacks.cancel}
                      link={link} exists={select.exists} t={t} depth={0} scroll={scroll} />)}
        </MiddleLayout>
      }

      <FullLayout>
        <div>
          {id === replyId &&
            <CommentForm  send={callbacks.uploadComment}
                          titleForm={t('comments.comment')}
                          titleAuth={t('comments.commentpos')}
                          link={link} exists={select.exists}
                          t={t}
                          />
          }
        </div>
      </FullLayout>
    </Spinner>
  );
}

export default memo(Comments);
import { memo, useCallback, useEffect, useState } from "react";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";
import CommentsList from "../../components/comments-list";
import CommentsTitle from "../../components/comments-title";
import CommentForm from "../../components/comment-form";
import commentAction from '../../store-redux/comment/actions';
import commentsListAction from '../../store-redux/comments-list/actions';
import useInit from '../../hooks/use-init';
import { useDispatch, useSelector as useSelectorRedux} from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import listToTree from '../../utils/list-to-tree/index';
import FullLayout from '../../components/full-layout';

function Comments() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [replyId, setReplyId] = useState(id);

  useInit(() => {
    dispatch(commentsListAction.loadList(id));
  }, [id]);

  const select = useSelector(state => ({
    exists: state.session.exists,
    selfId: state.session.user._id,
  }));

  const selectRedux = useSelectorRedux(state => ({
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
      dispatch(commentsListAction.loadList(id));
    }, [replyId]),

    // выбор кому отвечать
    reply: useCallback(id => {
      setReplyId(id);
    }, []),

    // отмена ответа
    cancel: useCallback(() => setReplyId(id), [])
  }

  console.log(listToTree(!!selectRedux.list.items ? selectRedux.list.items : []));

  return (
    <Spinner active={selectRedux.listLoading}>
      <CommentsTitle count={selectRedux.list.count || 0} />
      {selectRedux.list?.items?.length > 0 && <CommentsList data={listToTree(selectRedux.list.items)[0].children}
                                                  reply={callbacks.reply} replyId={replyId}
                                                  send={callbacks.uploadComment}
                                                  cancel={callbacks.cancel}
                                                  link={link} exists={select.exists}
                                                  selfId={select.selfId}
                                    />}
      {id === replyId &&
        <FullLayout>
          <CommentForm  send={callbacks.uploadComment}
                        titleForm={"комментарий"}
                        titleAuth={"что бы иметь возможность комментировать"}
                        link={link} exists={select.exists}
                        />
        </FullLayout>
      }
    </Spinner>
  );
}

export default memo(Comments);
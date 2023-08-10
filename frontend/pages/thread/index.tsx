import { GetServerSideProps, NextPage } from "next";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import styles from "../../styles/thread.module.scss";
import { CommentData } from "../../interfaces/CommentData";
import {
  fetchCommentData,
  fetchSpecificThreadData,
  sendCommentData,
} from "../../utils/api";
import moment from "moment";
import "moment-timezone";
import { ThreadData } from "../../interfaces/ThreadData";
import { useState } from "react";
import { Header } from "../../components/organisms/Header/Header";

interface Props {
  threadId: string;
  comments: CommentData[];
  resultThreadData: ThreadData[];
  langCookie: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { query, req } = context;
  // langCookieの値を取得する
  const langCookie = req.cookies.selectedLanguage || "original";
  const { threadId, lang } = query as { threadId: string; lang?: string };

  // fetchCommentData 開始時間
  const fetchCommentDataStartTime = Date.now();
  // const comments: CommentData[] = await fetchCommentData(threadId, false, lang);
  const comments: CommentData[] = await fetchCommentData(
    threadId,
    false,
    langCookie
  );
  // fetchCommentData 終了時間
  const fetchCommentDataEndTime = Date.now();
  // fetchCommentData の経過時間（ミリ秒）
  const fetchCommentDataDuration =
    fetchCommentDataEndTime - fetchCommentDataStartTime;

  // fetchSpecificThreadData 開始時間
  const fetchSpecificThreadDataStartTime = Date.now();
  const resultThreadData = await fetchSpecificThreadData(threadId);
  // fetchSpecificThreadData 終了時間
  const fetchSpecificThreadDataEndTime = Date.now();
  // fetchSpecificThreadData の経過時間（ミリ秒）
  const fetchSpecificThreadDataDuration =
    fetchSpecificThreadDataEndTime - fetchSpecificThreadDataStartTime;

  console.log("fetchCommentData Duration:", fetchCommentDataDuration, "ms");
  console.log(
    "fetchSpecificThreadData Duration:",
    fetchSpecificThreadDataDuration,
    "ms"
  );

  return {
    props: {
      threadId,
      comments,
      resultThreadData,
      langCookie,
    },
  };
};

const Thread: NextPage<Props> = (props) => {
  const [comments, setComments] = useState<CommentData[]>(props.comments);
  // TODO: ユーザのタイムゾーン予測など
  const userTimezone = "Asia/Tokyo";

  const convertUtcToUserTimezone = (
    utcDateString: string,
    userTimezone: string
  ): string => {
    const utcDate = moment.utc(utcDateString);
    const userDate = utcDate.tz(userTimezone).format("YYYY-MM-DD HH:mm:ss");
    return userDate;
  };

  // コメント入力フォームの状態管理
  const [userName, setUserName] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  // UserName入力フォームの変更ハンドラ
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // Comment入力フォームの変更ハンドラ
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  // コメント送信ハンドラ
  const handleCommentSubmit = async () => {
    // TODO: UserIdを各ユーザーごとに
    await sendCommentData(props.threadId, "10", userName, comment);
    setUserName("");
    setComment("");
    const newCommentsData: CommentData[] = await fetchCommentData(
      props.threadId,
      true,
      props.langCookie
    );
    setComments(newCommentsData);
  };

  return (
    <>
      <Header lang={props.langCookie} />
      <Container maxWidth="md">
        {/* タイトルなど */}
        <Box>
          <Typography variant="h3">
            {props.resultThreadData[0].title}
          </Typography>
          <Typography variant="body1">
            {props.resultThreadData[0].content}
          </Typography>
        </Box>
        {/* コメント表示 */}
        <Box mt={3}>
          {props.comments?.length === 0 ? (
            <Typography variant="body1">またコメントはありません。</Typography>
          ) : (
            <Grid container spacing={3}>
              {comments?.map((comment: CommentData, index: number) => (
                <Grid item xs={12} key={comment.commentID}>
                  <Card className={styles.card}>
                    <CardContent>
                      {/* コメントのヘッダー（コメント番号、ユーザー名、作成日、ユーザーID） */}
                      <Box
                        className={`${styles.comment_header} ${styles.commentBox}`}
                      >
                        <Typography
                          variant="h6"
                          className={styles.comment_number}
                        >
                          {index + 1}
                        </Typography>
                        <Typography
                          variant="h6"
                          className={styles.comment_username}
                        >
                          {comment.userName}
                        </Typography>
                        <Typography
                          variant="h6"
                          className={styles.comment_created_at}
                        >
                          {convertUtcToUserTimezone(
                            comment.createdAt,
                            userTimezone
                          )}
                        </Typography>
                        <Typography variant="h6">
                          {`ID: ${comment.userID}`}
                        </Typography>
                      </Box>
                      {/* コメント本文 */}
                      <Box>
                        <Typography variant="body1">
                          {comment.content}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* コメント入力フォーム */}
        <Box mt={3}>
          <Box mt={2}>
            <TextField
              label="ユーザー名(省略可)"
              value={userName}
              onChange={handleUserNameChange}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mt={1}>
            <TextField
              label="コメント"
              value={comment}
              onChange={handleCommentChange}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Box textAlign="right" mt={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
            >
              送信
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Thread;

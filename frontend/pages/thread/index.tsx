import { GetServerSideProps, NextPage } from "next";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
} from "@mui/material";
import styles from "../../styles/thread.module.scss";
import { CommentData } from "../../interfaces/CommentData";
import {
  fetchCommentData,
  fetchSpecificThreadData,
  sendCommentData,
} from "../../utils/api";
import "moment-timezone";
import { ThreadData } from "../../interfaces/ThreadData";
import { useState } from "react";
import { Header } from "../../components/organisms/Header/Header";
import TextWithNewLines from "../../components/Atoms/TextWithNewLines/TextWithNewLines";
import CustomTextField from "../../components/Atoms/CustomTextField/CustomTextField";
import { useForm } from "react-hook-form";
import { CommentFormValues } from "../../interfaces/CommentFormValues";
import { FormField } from "../../interfaces/FormField";
import { convertUtcToUserTimezone } from "../../utils/convertUtcUserTimezone";

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

  // コメント送信ハンドラ
  const handleCommentSubmit = async (data: CommentFormValues) => {
    // TODO: UserIdを各ユーザーごとに
    await sendCommentData(props.threadId, "10", data.author, data.comment);
    reset();
    const newCommentsData: CommentData[] = await fetchCommentData(
      props.threadId,
      true,
      props.langCookie
    );
    setComments(newCommentsData);
  };

  // コメント投稿フォーム用
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormValues>();

  const commentFormFields: FormField[] = [
    { name: "author", label: "作成者名", rows: 1 },
    { name: "comment", label: "コメント", rows: 4 },
  ];

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
          {comments?.length === 0 ? (
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
                          {comment.userName || "NO NAME"}
                        </Typography>
                        <Typography
                          variant="h6"
                          className={styles.comment_created_at}
                        >
                          {convertUtcToUserTimezone(comment.createdAt)}
                        </Typography>
                        <Typography variant="h6">
                          {`ID: ${comment.userID}`}
                        </Typography>
                      </Box>
                      {/* コメント本文 */}
                      <Box>
                        <Typography variant="body1">
                          <TextWithNewLines text={comment.content} />
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
        <form onSubmit={handleSubmit(handleCommentSubmit)}>
          {commentFormFields.map((field) => (
            <Box key={field.name} mt={1.5}>
              <CustomTextField
                name={field.name}
                label={field.label}
                register={register}
                errors={errors}
                rows={field.rows}
                isInputRequired={field.name === "author" ? false : true}
              />
            </Box>
          ))}
          <Box textAlign="right" mt={1}>
            <Button variant="contained" color="primary" type="submit">
              送信
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default Thread;

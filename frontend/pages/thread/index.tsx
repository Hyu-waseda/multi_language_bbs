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
import { useEffect, useState } from "react";
import { Header } from "../../components/organisms/Header/Header";
import TextWithNewLines from "../../components/Atoms/TextWithNewLines/TextWithNewLines";
import CustomTextField from "../../components/Atoms/CustomTextField/CustomTextField";
import { useForm } from "react-hook-form";
import { CommentFormValues } from "../../interfaces/CommentFormValues";
import { FormField } from "../../interfaces/FormField";
import { convertUtcToUserTimezone } from "../../utils/convertUtcUserTimezone";
import Meta from "../../components/organisms/Meta/Meta";
import { Index_EN } from "../../translate/en/pages/thread/Index_en";
import Footer from "../../components/organisms/Footer/Footer";
import { getUserLang } from "../../utils/getUserLang";
import { useRouter } from "next/router";

interface Props {
  threadId: string;
  comments: CommentData[];
  resultThreadData: ThreadData[];
  translation: Translation;
  userLang: string;
}

interface Translation {
  author: string;
  comment: string;
  no_comment: string;
  submit: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { req, query } = context;

  const userLang: string = getUserLang(context);
  const threadId: string = query.threadId as string;

  // fetchCommentData 開始時間
  const fetchCommentDataStartTime = Date.now();
  const comments: CommentData[] = await fetchCommentData(
    threadId,
    false,
    userLang
  );
  // fetchCommentData 終了時間
  const fetchCommentDataEndTime = Date.now();
  // fetchCommentData の経過時間（ミリ秒）
  const fetchCommentDataDuration =
    fetchCommentDataEndTime - fetchCommentDataStartTime;

  // fetchSpecificThreadData 開始時間
  const fetchSpecificThreadDataStartTime = Date.now();
  const resultThreadData = await fetchSpecificThreadData(
    threadId,
    userLang,
    false
  );
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

  let loadedTranslation: Translation;
  try {
    const translationModule = await import(
      `../../translate/${userLang}/pages/thread/Index_${userLang}.tsx`
    );
    loadedTranslation = translationModule.default;
  } catch (error) {
    console.error("Failed to load translation:", error);
    loadedTranslation = Index_EN;
  }

  return {
    props: {
      threadId,
      comments,
      resultThreadData,
      translation: loadedTranslation,
      userLang: userLang,
    },
  };
};

const Thread: NextPage<Props> = (props) => {
  const [comments, setComments] = useState<CommentData[]>(props.comments);
  const [threadData, setThreadData] = useState<ThreadData[]>(
    props.resultThreadData
  );
  const [isFirstRender, setIsFirstRender] = useState<Boolean>(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    const fetchData = async () => {
      const resultComment: CommentData[] = await fetchCommentData(
        props.threadId,
        true,
        props.userLang
      );
      setComments(resultComment);
      const resultThreadData: ThreadData[] = await fetchSpecificThreadData(
        props.threadId,
        props.userLang,
        true
      );
      setThreadData(resultThreadData);
    };
    fetchData();
  }, [props.userLang]);

  // コメント送信ハンドラ
  const handleCommentSubmit = async (data: CommentFormValues) => {
    // TODO: UserIdを各ユーザーごとに
    await sendCommentData(
      props.threadId,
      "10",
      data.author,
      data.comment,
      props.userLang
    );
    reset();
    const newCommentsData: CommentData[] = await fetchCommentData(
      props.threadId,
      true,
      props.userLang
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
    { name: "author", label: props.translation.author, rows: 1 },
    { name: "comment", label: props.translation.comment, rows: 4 },
  ];

  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <>
      <Meta
        title={threadData[0].title}
        description={threadData[0].content}
        pagePath={currentPath}
      />

      <Header lang={props.userLang} />
      <Container maxWidth="md">
        {/* タイトルなど */}
        <Box>
          <Typography variant="h4">{threadData[0].title}</Typography>
          <Typography variant="body1">{threadData[0].content}</Typography>
        </Box>
        {/* コメント表示 */}
        <Box mt={3}>
          {comments?.length === 0 ? (
            <Typography variant="body1">
              {props.translation.no_comment}
            </Typography>
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
                          variant="body1"
                          className={styles.comment_number}
                        >
                          {index + 1}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={styles.comment_username}
                        >
                          {comment.userName || "NO NAME"}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={styles.comment_created_at}
                        >
                          {convertUtcToUserTimezone(comment.createdAt)}
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
              {props.translation.submit}
            </Button>
          </Box>
        </form>

        <Footer lang={props.userLang} />
      </Container>
    </>
  );
};

export default Thread;

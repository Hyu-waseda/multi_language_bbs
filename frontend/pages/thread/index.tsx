import { GetServerSideProps, NextPage } from "next";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
  Skeleton,
} from "@mui/material";
import styles from "../../styles/thread.module.scss";
import { CommentData } from "../../interfaces/CommentData";
import {
  fetchCommentData,
  fetchThreadDetail,
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
  resultThreadDetail: ThreadData;
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
  const { query } = context;

  const userLang: string = getUserLang(context);
  const threadId: string = query.threadId as string;

  // fetchThreadDetail 開始時間
  const fetchThreadDetailStartTime = Date.now();
  const resultThreadDetail = await fetchThreadDetail(threadId, userLang, false);
  // fetchThreadDetail 終了時間
  const fetchThreadDetailEndTime = Date.now();
  // fetchThreadDetail の経過時間（ミリ秒）
  const fetchThreadDetailDuration =
    fetchThreadDetailEndTime - fetchThreadDetailStartTime;
  console.log("fetchThreadDetail Duration:", fetchThreadDetailDuration, "ms");

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
      resultThreadDetail,
      translation: loadedTranslation,
      userLang: userLang,
    },
  };
};

const Thread: NextPage<Props> = (props) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [isFirstCommentsLoadComplete, setIsFirstCommentsLoadComplete] =
    useState<boolean>(false);

  const [threadDetail, setThreadDetail] = useState<ThreadData>(
    props.resultThreadDetail
  );
  const [isLoadingThreadDetail, setIsLoadingThreadDetail] =
    useState<boolean>(false);
  const [lastLang, setLastLang] = useState<string>(props.userLang);

  // スレッド詳細情報の更新
  useEffect(() => {
    if (props.userLang !== lastLang) {
      let timer: NodeJS.Timeout = setTimeout(() => {
        setIsLoadingThreadDetail(true);
      }, 500);

      const fetchData = async () => {
        const resultThreadDetail: ThreadData = await fetchThreadDetail(
          props.threadId,
          props.userLang,
          true
        );
        setThreadDetail(resultThreadDetail);
        clearTimeout(timer);
        setIsLoadingThreadDetail(false);
        setLastLang(props.userLang);
      };

      fetchData();
      return () => clearTimeout(timer);
    }
  }, [props.userLang, props.threadId]);

  // コメントの取得・更新
  useEffect(() => {
    // 0.5秒経過後にスケルトンスクリーンを表示
    let timer: NodeJS.Timeout = setTimeout(() => {
      setIsLoadingComments(true);
    }, 500);

    const fetchData = async () => {
      const resultComment: CommentData[] = await fetchCommentData(
        props.threadId,
        true,
        props.userLang
      );
      setComments(resultComment);
      // 0.5秒以内にフェッチが完了した場合、スケルトンスクリーンを表示しない
      if (!isLoadingComments) {
        clearTimeout(timer);
      }
      setIsLoadingComments(false);
      setIsFirstCommentsLoadComplete(true);
    };

    fetchData();
    return () => clearTimeout(timer);
  }, [props.threadId, props.userLang]);

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

  const CommentSkeleton = () => (
    <Grid item xs={12}>
      <Card className={styles.card}>
        <CardContent>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <>
      <Meta
        title={threadDetail.title}
        description={threadDetail.content}
        pagePath={currentPath}
      />

      <Header lang={props.userLang} />
      <Container maxWidth="md">
        {/* タイトルなど */}
        {isLoadingThreadDetail ? (
          // スケルトンスクリーン表示
          <Skeleton variant="rectangular" width="100%" height={118} />
        ) : (
          // タイトルなど
          <Box>
            <Typography variant="h4">{threadDetail.title}</Typography>
            <Typography variant="body1">{threadDetail.content}</Typography>
          </Box>
        )}
        {/* コメント表示 */}
        <Box mt={3}>
          {isLoadingComments || !isFirstCommentsLoadComplete ? (
            <Grid container spacing={3}>
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </Grid>
          ) : comments?.length === 0 ? (
            <Typography variant="body1">
              {props.translation.no_comment}
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {comments?.map((comment: CommentData, index: number) => (
                <Grid item xs={12} key={comment.commentID}>
                  <Card className={styles.card}>
                    <CardContent>
                      {/* コメントのヘッダー（コメント番号、ユーザー名、作成日） */}
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

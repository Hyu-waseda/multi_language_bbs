import { GetServerSideProps, NextPage } from "next";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
} from "@mui/material";
import styles from "../../styles/thread.module.scss";
import { CommentData } from "../../interfaces/CommentData";
import { fetchCommentData, fetchSpecificThreadData } from "../../utils/api";
import { API_ENDPOINSTS } from "../../const";
import moment from "moment";
import "moment-timezone";
import { ThreadData } from "../../interfaces/ThreadData";

interface Props {
  threadId: string | undefined;
  comments: CommentData[];
  resultThreadData: ThreadData[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { query } = context;
  const threadId = query.threadId as string | undefined;

  const comments: CommentData[] = await fetchCommentData(
    API_ENDPOINSTS.COMMENT.ENDPOINT,
    threadId
  );
  const resultThreadData = await fetchSpecificThreadData(
    `${API_ENDPOINSTS.THREAD.ENDPOINT}/${threadId}`
  );

  return {
    props: {
      threadId,
      comments,
      resultThreadData,
    },
  };
};

const Thread: NextPage<Props> = (props) => {
  // TODO: ユーザのタイムゾーン予測など
  const userTimezone = "Asia/Tokyo"; // ユーザーのタイムゾーンを指定

  const convertUtcToUserTimezone = (
    utcDateString: string,
    userTimezone: string
  ): string => {
    const utcDate = moment.utc(utcDateString);
    const userDate = utcDate.tz(userTimezone).format("YYYY-MM-DD HH:mm:ss");
    return userDate;
  };

  return (
    <Container maxWidth="md">
      {/* タイトルなど */}
      <Box>
        <Typography variant="h3">{props.resultThreadData[0].title}</Typography>
        <Typography variant="body1">
          {props.resultThreadData[0].content}
        </Typography>
      </Box>
      {/* コメント表示 */}
      <Box mt={3}>
        {props.comments.length === 0 ? (
          <Typography variant="body1">またコメントはありません。</Typography>
        ) : (
          <Grid container spacing={3}>
            {props.comments.map((comment: CommentData, index: number) => (
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
                      <Typography variant="body1">{comment.content}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Thread;

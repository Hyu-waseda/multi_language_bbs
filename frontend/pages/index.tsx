import React from "react";
import { ThreadData } from "../interfaces/ThreadData";
import Link from "next/link";
import {
  Card,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { fetchThreadData } from "../utils/api";
import { API_ENDPOINSTS } from "../const";

interface Props {
  resultLatestThreads: ThreadData[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const LatestThreads: ThreadData[] = await fetchThreadData(API_ENDPOINSTS.THREAD.ENDPOINT, 5);

  return {
    props: {
      resultLatestThreads: LatestThreads,
    },
  };
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4">最新スレッド一覧</Typography>
        <Divider />
        <Card>
          <List>
            {props.resultLatestThreads.map((thread) => (
              <Link key={thread.title} href={`/thread/${thread.threadID}`}>
                <ListItem>
                  <ListItemText
                    primary={thread.title}
                    secondary={`作成日：${thread.updatedAt}`}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Card>
      </Container>
    </>
  );
};

export default Home;

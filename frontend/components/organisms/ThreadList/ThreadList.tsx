import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { ThreadData } from "../../../interfaces/ThreadData";
import { createURL } from "../../../utils/createUrl";
import Link from "next/link";
import Pager from "../Pager/Pager";
import { PAGE_URL } from "../../../const";

interface Props {
  threads: ThreadData[];
  title: string;
  page: number;
  totalCount: number;
  perPage: number;
  handlePager: (selectedPage: number) => void;
  secondaryKey: "createdAt" | "updatedAt";
}

const ThreadList: React.FC<Props> = (props) => {
  const createUrlToThread = (threadId: string): string => {
    const currentParams = new URLSearchParams();
    // TODO: 丸め込み
    currentParams.set("threadId", threadId);
    const newUrl = createURL(PAGE_URL.THREAD, currentParams);
    return newUrl;
  };
  return (
    <>
      <Typography variant="h4">{props.title}</Typography>
      <Divider />
      <Card>
        <List>
          {props.threads.map((thread) => (
            <Link
              key={thread.title}
              href={createUrlToThread(String(thread.threadID))}
            >
              <ListItem>
                <ListItemText
                  primary={thread.title}
                  secondary={`${
                    props.secondaryKey === "createdAt" ? "作成日：" : "更新日："
                  }${thread[props.secondaryKey]}`}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Card>
      <Pager
        totalCount={props.totalCount}
        perPage={props.perPage}
        page={props.page}
        handlePager={props.handlePager}
      />
    </>
  );
};

export default ThreadList;

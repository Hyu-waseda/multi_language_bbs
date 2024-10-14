import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { ThreadData } from "../../../interfaces/ThreadData";
import { createURL } from "../../../utils/createUrl";
import Link from "next/link";
import Pager from "../Pager/Pager";
import { PAGE_PATH, SORT_OPTIONS } from "../../../const";
import { convertUtcToUserTimezone } from "../../../utils/convertUtcUserTimezone";

interface Props {
  threads: ThreadData[];
  title: string;
  page: number;
  totalCount: number;
  perPage: number;
  handlePager: (selectedPage: number) => void;
  sortOption: SORT_OPTIONS;
  labelForDate: string;
  lang: string;
  showSkeleton: boolean;
}

const ThreadList: React.FC<Props> = (props) => {
  const createUrlToThread = (threadId: string): string => {
    const currentParams = new URLSearchParams();
    currentParams.set("threadId", threadId);
    currentParams.set("lang", props.lang);
    return createURL(PAGE_PATH.THREAD, currentParams);
  };

  const createSkeleton = (index: number) => (
    <ListItem key={`${props.sortOption}-skeleton-${index}`}>
      <ListItemText
        primary={<Skeleton variant="text" />}
        secondary={<Skeleton variant="text" />}
      />
    </ListItem>
  );

  const createThreadItem = (thread: ThreadData) => (
    <Link
      key={`${thread.threadID}-${props.sortOption}`}
      href={createUrlToThread(String(thread.threadID))}
      passHref
    >
      <ListItemButton>
        <ListItemText
          primary={thread.title}
          secondary={
            props.sortOption === "commentCount"
              ? `Comments: ${thread.commentCount}`
              : `${props.labelForDate}: ${convertUtcToUserTimezone(
                  String(thread[props.sortOption as keyof ThreadData])
                )}`
          }
        />
      </ListItemButton>
    </Link>
  );

  return (
    <>
      <Typography variant="h4">{props.title}</Typography>
      <Divider />
      <Card>
        <List key={props.sortOption}>
          {props.showSkeleton
            ? Array.from(new Array(props.perPage)).map((_, index) =>
                createSkeleton(index)
              )
            : props.threads.map(createThreadItem)}
        </List>
      </Card>
      {!props.showSkeleton && (
        <Pager
          totalCount={props.totalCount}
          perPage={props.perPage}
          page={props.page}
          handlePager={props.handlePager}
        />
      )}
    </>
  );
};

export default ThreadList;

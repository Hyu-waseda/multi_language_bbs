import { Box, Pagination } from "@mui/material";
import styles from "./Pager.module.scss";

interface Props {
  totalCount: number;
  perPage: number;
  page: number;
  handlePager: (selectedPage: number) => void;
}

const Pager: React.FC<Props> = ({ totalCount, perPage, page, handlePager }) => {
  return (
    <Box className={styles.pager}>
      <Pagination
        count={Math.ceil(totalCount / perPage)}
        page={page}
        onChange={(e, v) => handlePager(v)}
        color="primary"
      />
    </Box>
  );
};

export default Pager;

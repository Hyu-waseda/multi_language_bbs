import { NextPage } from "next";
import { Header } from "../../components/organisms/Header/Header";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useCookie } from "../../utils/useCookie";
import { ThreadFormValues } from "../../interfaces/ThreadFormValues";
import { sendThreadData } from "../../utils/api";
import CustomTextField from "../../components/Atoms/CustomTextField/CustomTextField";

const ThreadCreate: NextPage = () => {
  // Cookieから現在の言語設定を取得
  // TODO: 丸め込み
  const langCookie = useCookie("selectedLanguage");

  // スレッド投稿フォーム用
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ThreadFormValues>();

  // フォーム送信時の処理
  const onSubmit = async (data: ThreadFormValues) => {
    await sendThreadData(
      data.title,
      "10",
      data.author,
      data.description,
      langCookie
    );
    reset();
  };

  return (
    <>
      <Header lang={langCookie} />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          新規スレッド作成
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt={3}>
            <CustomTextField
              name="title"
              label="タイトル"
              register={register}
              errors={errors}
            />
          </Box>
          <Box mt={1}>
            <CustomTextField
              name="author"
              label="作成者名"
              register={register}
              errors={errors}
            />
          </Box>
          <Box mt={1.5}>
            <CustomTextField
              name="description"
              label="概要"
              register={register}
              errors={errors}
              rows={4}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button type="submit" variant="contained">
              スレッド作成
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default ThreadCreate;

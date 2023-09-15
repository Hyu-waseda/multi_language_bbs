import { NextPage } from "next";
import { Header } from "../../components/organisms/Header/Header";
import { Container, Typography, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useCookie } from "../../utils/useCookie";
import { ThreadFormValues } from "../../interfaces/ThreadFormValues";
import { sendThreadData } from "../../utils/api";
import CustomTextField from "../../components/Atoms/CustomTextField/CustomTextField";
import { FormField } from "../../interfaces/FormField";

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

  const threadFormFields: FormField[] = [
    { name: "title", label: "タイトル", rows: 1 },
    { name: "author", label: "作成者名", rows: 1 },
    { name: "description", label: "概要", rows: 4 },
  ];

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
          {threadFormFields.map((field) => (
            <Box key={field.name} mt={1.5}>
              <CustomTextField
                name={field.name}
                label={field.label}
                register={register}
                errors={errors}
                rows={field.rows}
              />
            </Box>
          ))}
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

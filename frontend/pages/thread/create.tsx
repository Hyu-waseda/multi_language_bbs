import { NextPage } from "next";
import { Header } from "../../components/organisms/Header/Header";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useCookie } from "../../utils/useCookie";
import { ThreadFormValues } from "../../interfaces/ThreadFormValues";
import { sendThreadData } from "../../utils/api";

const ThreadCreate: NextPage = () => {
  // Cookieから現在の言語設定を取得
  // TODO: 丸め込み
  const langCookie = useCookie("selectedLanguage");

  // React Hook Formの設定
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ThreadFormValues>();

  // Enterキーでの送信を防止するための関数
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

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

  // テキストフィールドのレンダリング用関数
  const renderTextField = (name: keyof ThreadFormValues, label: string) => (
    <TextField
      fullWidth
      label={label}
      {...register(name, {
        required: `${label}は必須です`,
        maxLength: {
          value: 255,
          message: `${label}は255文字以下で入力してください`,
        },
      })}
      error={Boolean(errors[name])}
      helperText={errors[name]?.message}
      onKeyDown={handleKeyPress}
    />
  );

  return (
    <>
      <Header lang={langCookie} />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          新規スレッド作成
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt={3}>{renderTextField("title", "タイトル")}</Box>
          <Box mt={1}>{renderTextField("author", "作成者名")}</Box>
          <Box mt={1.5}>
            <TextField
              fullWidth
              label="概要"
              {...register("description", {
                required: "概要は必須です",
                maxLength: {
                  value: 255,
                  message: "概要は255文字以下で入力してください",
                },
              })}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
              multiline
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

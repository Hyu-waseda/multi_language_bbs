import { GetServerSideProps, NextPage } from "next";
import { Header } from "../../components/organisms/Header/Header";
import { Container, Typography, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useCookie } from "../../utils/useCookie";
import { ThreadFormValues } from "../../interfaces/ThreadFormValues";
import { sendThreadData } from "../../utils/api";
import CustomTextField from "../../components/Atoms/CustomTextField/CustomTextField";
import { FormField } from "../../interfaces/FormField";
import Meta from "../../components/organisms/Meta/Meta";
import { COOKIE, PAGE_META } from "../../const";
import Create_EN from "../../translate/en/pages/thread/Create_en";

interface Props {
  translation: Translation;
}

interface Translation {
  new_thread_creation: string;
  create_thread: string;
  title: string;
  author: string;
  description: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const langCookie = context.req.cookies.selectedLanguage || "original";

  let loadedTranslation: Translation;

  try {
    const translationModule = await import(
      `../../translate/${langCookie}/pages/thread/Create_${langCookie}.tsx`
    );
    loadedTranslation = translationModule.default;
  } catch (error) {
    console.error("Failed to load translation:", error);
    loadedTranslation = Create_EN;
  }

  return {
    props: {
      translation: loadedTranslation,
    },
  };
};

const ThreadCreate: NextPage<Props> = (props) => {
  const langCookie = useCookie(COOKIE.SELECTED_LANGUAGE) || "original";

  // スレッド投稿フォーム用
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ThreadFormValues>();

  const threadFormFields: FormField[] = [
    { name: "title", label: props.translation.title, rows: 1 },
    { name: "author", label: props.translation.author, rows: 1 },
    {
      name: "description",
      label: props.translation.description,
      rows: 4,
    },
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
      <Meta
        title={PAGE_META.THREAD_CREATE.title}
        description={PAGE_META.THREAD_CREATE.description}
      />

      <Header lang={langCookie} />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          {props.translation.new_thread_creation}
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
              {props.translation.create_thread}
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default ThreadCreate;

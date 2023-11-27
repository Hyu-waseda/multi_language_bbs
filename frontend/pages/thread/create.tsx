import { GetServerSideProps, NextPage } from "next";
import { Header } from "../../components/organisms/Header/Header";
import { Container, Typography, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { ThreadFormValues } from "../../interfaces/ThreadFormValues";
import { sendThreadData } from "../../utils/api";
import CustomTextField from "../../components/Atoms/CustomTextField/CustomTextField";
import { FormField } from "../../interfaces/FormField";
import Meta from "../../components/organisms/Meta/Meta";
import Create_EN from "../../translate/en/pages/thread/Create_en";
import { getUserLang } from "../../utils/getUserLang";
import Footer from "../../components/organisms/Footer/Footer";
import { useRouter } from "next/router";

interface Props {
  translation: Translation;
  userLang: string;
}

interface Translation {
  new_thread_creation: string;
  create_thread: string;
  title: string;
  author: string;
  description: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userLang: string = getUserLang(context);

  let loadedTranslation: Translation;
  try {
    const translationModule = await import(
      `../../translate/${userLang}/pages/thread/Create_${userLang}.tsx`
    );
    loadedTranslation = translationModule.default;
  } catch (error) {
    console.error("Failed to load translation:", error);
    loadedTranslation = Create_EN;
  }

  return {
    props: {
      translation: loadedTranslation,
      userLang: userLang,
    },
  };
};

const ThreadCreate: NextPage<Props> = (props) => {
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
      props.userLang
    );
    reset();
  };

  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <>
      <Meta
        title={props.translation.new_thread_creation}
        description={props.translation.create_thread}
        pagePath={currentPath}
      />

      <Header lang={props.userLang} />
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
      <Footer lang={props.userLang} />
    </>
  );
};

export default ThreadCreate;

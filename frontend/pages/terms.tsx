import { GetServerSideProps, NextPage } from "next";
import { Container, Typography, Box } from "@mui/material";
import { Header } from "../components/organisms/Header/Header";
import terms_EN from "../translate/en/pages/terms_en";
import { getUserLang } from "../utils/getUserLang";

interface Props {
  userLang: string;
  translation: Translation;
}

export interface SectionContent {
  title: string;
  content: string | string[];
}

export interface Sections {
  [key: string]: SectionContent;
}

export interface Translation {
  header: SectionContent;
  sections: Sections;
  footer: {
    content: string;
  };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userLang = getUserLang(context);

  let translation;
  try {
    const translationModule = await import(
      `../translate/${userLang}/pages/terms_${userLang}.tsx`
    );
    translation = translationModule.default;
  } catch (error) {
    console.error("Failed to load translation:", error);
    translation = terms_EN;
  }

  return {
    props: {
      userLang,
      translation,
    },
  };
};

const Terms: NextPage<Props> = (props) => {
  return (
    <>
      <Header lang={props.userLang} />
      <Container maxWidth="md">
        <Box mt={4} mb={3}>
          <Typography variant="h4" align="center">
            {props.translation.header.title}
          </Typography>
          <Typography mt={2}>{props.translation.header.content}</Typography>
        </Box>
        {Object.entries(props.translation.sections).map(
          ([sectionKey, sectionValue]) => (
            <Box mt={3} key={sectionKey}>
              <Typography variant="h5">{sectionValue.title}</Typography>
              {Array.isArray(sectionValue.content) ? (
                sectionValue.content.map((text, index) => (
                  <Box key={index} mt={2} ml={2}>
                    <Typography ml={text.startsWith("-") ? 2 : 0}>
                      {text}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography ml={sectionValue.content.startsWith("-") ? 2 : 0}>
                  {sectionValue.content}
                </Typography>
              )}
            </Box>
          )
        )}
        <Box textAlign="right" mt={2}>
          <Typography>{props.translation.footer.content}</Typography>
        </Box>
      </Container>
    </>
  );
};

export default Terms;

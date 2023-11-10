import { GetServerSideProps, NextPage } from "next";
import { Container, Typography, Box } from "@mui/material";
import { Header } from "../components/organisms/Header/Header";
import terms_EN from "../translate/en/pages/terms_en";
import Terms_AR from "../translate/ar/pages/terms_ar";

interface Props {
  langCookie: string;
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
  const { req } = context;
  const langCookie = req.cookies.selectedLanguage || "original";

  let translation;
  try {
    const translationModule = await import(
      `../translate/${langCookie}/pages/terms_${langCookie}.tsx`
    );
    translation = translationModule.default;
  } catch (error) {
    console.error("Failed to load translation:", error);
    translation = terms_EN;
  }

  return {
    props: {
      langCookie,
      translation,
    },
  };
};

const Terms: NextPage<Props> = (props) => {
  return (
    <>
      <Header lang={props.langCookie} />
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

import { createContext, Dispatch, SetStateAction } from "react";

export interface LanguageContextData {
  userLanguage: string;
  setUserLanguage: Dispatch<SetStateAction<string>>;
}

export const UserLanguageContext = createContext({} as LanguageContextData);

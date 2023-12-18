// ドメイン
export const DOMAIN = "http://www.waseda-nishimura.org";

// 各ページのURL
export const PAGE_PATH = {
  HOME: "/",
  THREAD: "/thread",
  THREAD_CREATE: "/thread/create",
  HELP: "/help",
  PRIVACY_POLICY: "/policy",
  TERMS_OF_SERVICE: "/terms",
  DISCLAIMER: "/disclaimer",
  // TODO: 404ページのパス
  NOT_FOUND: "/",
};

// 各ページのヘッダのメタ情報
// TODO: descriptionの改善
export const PAGE_META = {
  HOME: {
    title: "The Channel",
    description:
      "The Channelは多言語自動翻訳掲示板です。世界中の人々と簡単にコミュニケーションを取ることができます。",
  },
  THREAD: {
    title: "スレッド",
    description:
      "様々なトピックのスレッドを探索し、多言語での対話を楽しんでください。",
  },
  THREAD_CREATE: {
    title: "スレッド作成",
    description:
      "新しいスレッドを作成し、グローバルなコミュニケーションを開始しましょう。",
  },
  HELP: {
    title: "ヘルプ",
    description:
      "The Channelの使用方法についての詳細情報とサポートをご覧ください。",
  },
  PRIVACY_POLICY: {
    title: "プライバシーポリシー",
    description: "当社のプライバシーポリシーについて詳細を確認してください。",
  },
  TERMS_OF_SERVICE: {
    title: "利用規約",
    description: "The Channelの利用規約をご確認ください。",
  },
  DISCLAIMER: {
    title: "免責事項",
    description: "The Channelの免責事項についてこちらで読むことができます。",
  },
  CONTACT_US: {
    title: "お問い合わせ",
    description: "ご質問やフィードバックはこちらからお送りください。",
  },
  NOT_FOUND: {
    title: "404: ページが見つかりません",
    description:
      "お探しのページは見つかりませんでした。ホームページに戻るか、サイトを検索してください。",
  },
};

// 各APIのエンドポイント
export const API = {
  ENDPOINT: {
    DUMMY: "/dummy",
    THREAD: "/thread",
    COMMENT: "/comment",
  },
};

// 翻訳用言語一覧
export const LANGUAGES = [
  { code: "original", language: "original", languageCapitalized: "Original" },
  { code: "ja", language: "japanese", languageCapitalized: "Japanese(日本語)" },
  { code: "af", language: "afrikaans", languageCapitalized: "Afrikaans" },
  { code: "sq", language: "albanian", languageCapitalized: "Albanian" },
  { code: "am", language: "amharic", languageCapitalized: "Amharic" },
  { code: "ar", language: "arabic", languageCapitalized: "Arabic" },
  { code: "hy", language: "armenian", languageCapitalized: "Armenian" },
  { code: "az", language: "azerbaijani", languageCapitalized: "Azerbaijani" },
  { code: "eu", language: "basque", languageCapitalized: "Basque" },
  { code: "be", language: "belarusian", languageCapitalized: "Belarusian" },
  { code: "bn", language: "bengali", languageCapitalized: "Bengali" },
  { code: "bs", language: "bosnian", languageCapitalized: "Bosnian" },
  { code: "bg", language: "bulgarian", languageCapitalized: "Bulgarian" },
  { code: "ca", language: "catalan", languageCapitalized: "Catalan" },
  { code: "ceb", language: "cebuano", languageCapitalized: "Cebuano" },
  { code: "ny", language: "chichewa", languageCapitalized: "Chichewa" },
  {
    code: "zh-cn",
    language: "chinese (簡体字)",
    languageCapitalized: "Chinese (簡体字)",
  },
  {
    code: "zh-tw",
    language: "chinese (繁体字)",
    languageCapitalized: "Chinese (繁体字)",
  },
  { code: "co", language: "corsican", languageCapitalized: "Corsican" },
  { code: "hr", language: "croatian", languageCapitalized: "Croatian" },
  { code: "cs", language: "czech", languageCapitalized: "Czech" },
  { code: "da", language: "danish", languageCapitalized: "Danish" },
  { code: "nl", language: "dutch", languageCapitalized: "Dutch" },
  { code: "en", language: "english", languageCapitalized: "English" },
  { code: "eo", language: "esperanto", languageCapitalized: "Esperanto" },
  { code: "et", language: "estonian", languageCapitalized: "Estonian" },
  {
    code: "tl",
    language: "filipino (Tagalog)",
    languageCapitalized: "Filipino (Tagalog)",
  },
  { code: "fi", language: "finnish", languageCapitalized: "Finnish" },
  { code: "fr", language: "french", languageCapitalized: "French" },
  { code: "fy", language: "frisian", languageCapitalized: "Frisian" },
  { code: "gl", language: "galician", languageCapitalized: "Galician" },
  { code: "ka", language: "georgian", languageCapitalized: "Georgian" },
  { code: "de", language: "german", languageCapitalized: "German" },
  { code: "el", language: "greek", languageCapitalized: "Greek" },
  { code: "gu", language: "gujarati", languageCapitalized: "Gujarati" },
  {
    code: "ht",
    language: "haitian creole",
    languageCapitalized: "Haitian Creole",
  },
  { code: "ha", language: "hausa", languageCapitalized: "Hausa" },
  { code: "haw", language: "hawaiian", languageCapitalized: "Hawaiian" },
  { code: "iw", language: "hebrew", languageCapitalized: "Hebrew" },
  { code: "he", language: "hebrew", languageCapitalized: "Hebrew" },
  { code: "hi", language: "hindi", languageCapitalized: "Hindi" },
  { code: "hmn", language: "hmong", languageCapitalized: "Hmong" },
  { code: "hu", language: "hungarian", languageCapitalized: "Hungarian" },
  { code: "is", language: "icelandic", languageCapitalized: "Icelandic" },
  { code: "ig", language: "igbo", languageCapitalized: "Igbo" },
  { code: "id", language: "indonesian", languageCapitalized: "Indonesian" },
  { code: "ga", language: "irish", languageCapitalized: "Irish" },
  { code: "it", language: "italian", languageCapitalized: "Italian" },
  { code: "jw", language: "javanese", languageCapitalized: "Javanese" },
  { code: "kn", language: "kannada", languageCapitalized: "Kannada" },
  { code: "kk", language: "kazakh", languageCapitalized: "Kazakh" },
  { code: "km", language: "khmer", languageCapitalized: "Khmer" },
  { code: "ko", language: "korean", languageCapitalized: "Korean" },
  {
    code: "ku",
    language: "kurdish (kurmanji)",
    languageCapitalized: "Kurdish (Kurmanji)",
  },
  { code: "ky", language: "kyrgyz", languageCapitalized: "Kyrgyz" },
  { code: "lo", language: "lao", languageCapitalized: "Lao" },
  { code: "la", language: "latin", languageCapitalized: "Latin" },
  { code: "lv", language: "latvian", languageCapitalized: "Latvian" },
  { code: "lt", language: "lithuanian", languageCapitalized: "Lithuanian" },
  {
    code: "lb",
    language: "luxembourgish",
    languageCapitalized: "Luxembourgish",
  },
  { code: "mk", language: "macedonian", languageCapitalized: "Macedonian" },
  { code: "mg", language: "malagasy", languageCapitalized: "Malagasy" },
  { code: "ms", language: "malay", languageCapitalized: "Malay" },
  { code: "ml", language: "malayalam", languageCapitalized: "Malayalam" },
  { code: "mt", language: "maltese", languageCapitalized: "Maltese" },
  { code: "mi", language: "maori", languageCapitalized: "Maori" },
  { code: "mr", language: "marathi", languageCapitalized: "Marathi" },
  { code: "mn", language: "mongolian", languageCapitalized: "Mongolian" },
  {
    code: "my",
    language: "myanmar (burmese)",
    languageCapitalized: "Myanmar (Burmese)",
  },
  { code: "ne", language: "nepali", languageCapitalized: "Nepali" },
  { code: "no", language: "norwegian", languageCapitalized: "Norwegian" },
  { code: "or", language: "odia", languageCapitalized: "Odia" },
  { code: "ps", language: "pashto", languageCapitalized: "Pashto" },
  { code: "fa", language: "persian", languageCapitalized: "Persian" },
  { code: "pl", language: "polish", languageCapitalized: "Polish" },
  { code: "pt", language: "portuguese", languageCapitalized: "Portuguese" },
  { code: "pa", language: "punjabi", languageCapitalized: "Punjabi" },
  { code: "ro", language: "romanian", languageCapitalized: "Romanian" },
  { code: "ru", language: "russian", languageCapitalized: "Russian" },
  { code: "sm", language: "samoan", languageCapitalized: "Samoan" },
  { code: "gd", language: "scots gaelic", languageCapitalized: "Scots Gaelic" },
  { code: "sr", language: "serbian", languageCapitalized: "Serbian" },
  { code: "st", language: "sesotho", languageCapitalized: "Sesotho" },
  { code: "sn", language: "shona", languageCapitalized: "Shona" },
  { code: "sd", language: "sindhi", languageCapitalized: "Sindhi" },
  { code: "si", language: "sinhala", languageCapitalized: "Sinhala" },
  { code: "sk", language: "slovak", languageCapitalized: "Slovak" },
  { code: "sl", language: "slovenian", languageCapitalized: "Slovenian" },
  { code: "so", language: "somali", languageCapitalized: "Somali" },
  { code: "es", language: "spanish", languageCapitalized: "Spanish" },
  { code: "su", language: "sundanese", languageCapitalized: "Sundanese" },
  { code: "sw", language: "swahili", languageCapitalized: "Swahili" },
  { code: "sv", language: "swedish", languageCapitalized: "Swedish" },
  { code: "tg", language: "tajik", languageCapitalized: "Tajik" },
  { code: "ta", language: "tamil", languageCapitalized: "Tamil" },
  { code: "te", language: "telugu", languageCapitalized: "Telugu" },
  { code: "th", language: "thai", languageCapitalized: "Thai" },
  { code: "tr", language: "turkish", languageCapitalized: "Turkish" },
  { code: "uk", language: "ukrainian", languageCapitalized: "Ukrainian" },
  { code: "ur", language: "urdu", languageCapitalized: "Urdu" },
  { code: "ug", language: "uyghur", languageCapitalized: "Uyghur" },
  { code: "uz", language: "uzbek", languageCapitalized: "Uzbek" },
  { code: "vi", language: "vietnamese", languageCapitalized: "Vietnamese" },
  { code: "cy", language: "welsh", languageCapitalized: "Welsh" },
  { code: "xh", language: "xhosa", languageCapitalized: "Xhosa" },
  { code: "yi", language: "yiddish", languageCapitalized: "Yiddish" },
  { code: "yo", language: "yoruba", languageCapitalized: "Yoruba" },
  { code: "zu", language: "zulu", languageCapitalized: "Zulu" },
];
// export const LANGUAGES = [
//   { code: "original", language: "original", languageCapitalized: "Original" },
//   { code: "af", language: "afrikaans", languageCapitalized: "Afrikaans" },
//   { code: "sq", language: "albanian", languageCapitalized: "Albanian" },
//   { code: "am", language: "amharic", languageCapitalized: "Amharic" },
//   { code: "ar", language: "arabic", languageCapitalized: "Arabic" },
//   {
//     code: "zh-cn",
//     language: "chinese (simplified)",
//     languageCapitalized: "Chinese (Simplified)",
//   },
//   { code: "en", language: "english", languageCapitalized: "English" },
//   {
//     code: "tl",
//     language: "filipino (Tagalog)",
//     languageCapitalized: "Filipino (Tagalog)",
//   },
//   { code: "fi", language: "finnish", languageCapitalized: "Finnish" },
//   { code: "fr", language: "french", languageCapitalized: "French" },

//   { code: "ja", language: "japanese", languageCapitalized: "Japanese" },
//   { code: "fa", language: "persian", languageCapitalized: "Persian" },
//   { code: "es", language: "spanish", languageCapitalized: "Spanish" },
// ];

export enum SORT_OPTIONS {
  UPDATED = "updatedAt",
  CREATED = "createdAt",
}

export const COOKIE = {
  SELECTED_LANGUAGE: "selectedLanguage",
};

export const TWITTER_CARD_IMG_URL = "http://www.waseda-nishimura.org/home.png";

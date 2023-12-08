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
  { code: "ar", language: "arabic", languageCapitalized: "Arabic" },
  {
    code: "zh-cn",
    language: "chinese (simplified)",
    languageCapitalized: "Chinese (Simplified)",
  },
  { code: "en", language: "english", languageCapitalized: "English" },
  { code: "fr", language: "french", languageCapitalized: "French" },
  { code: "ja", language: "japanese", languageCapitalized: "Japanese" },
  { code: "es", language: "spanish", languageCapitalized: "Spanish" },
  {
    code: "tl",
    language: "filipino (Tagalog)",
    languageCapitalized: "Filipino (Tagalog)",
  },
  { code: "fi", language: "finnish", languageCapitalized: "Finnish" },
];

export enum SORT_OPTIONS {
  UPDATED = "updatedAt",
  CREATED = "createdAt",
}

export const COOKIE = {
  SELECTED_LANGUAGE: "selectedLanguage",
};

export const TWITTER_CARD_IMG_URL = "http://www.waseda-nishimura.org/home.png";

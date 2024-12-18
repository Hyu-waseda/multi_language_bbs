import { API } from "../const";

const baseURLServer = process.env.API_BASE_URL_SERVER;
const baseURLClient = process.env.NEXT_PUBLIC_API_BASE_URL_CLIENT;

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("APIエラー: " + response.status);
    }

    return await response.json();
  } catch (error: any) {
    console.error("APIリクエストエラー:", error.message);
    throw error;
  }
};

const createUrlWithParams = (url: string, params?: Record<string, string>) => {
  if (!params) return url;

  const queryParams = new URLSearchParams(params);
  return `${url}?${queryParams.toString()}`;
};

export const fetchNewThreadData = async (
  page: number,
  perPage: number,
  isClient: boolean,
  lang: string
) => {
  const offset: number = (page - 1) * perPage;
  const base = isClient ? baseURLClient : baseURLServer;
  const url: string = createUrlWithParams(base + API.ENDPOINT.THREAD, {
    offset: String(offset),
    count: String(perPage),
    // TODO: 丸め込み
    sort: "new",
    lang: lang,
  });
  return await fetchData(url);
};

export const fetchUpdatedThreadData = async (
  page: number,
  perPage: number,
  isClient: boolean,
  lang: string
) => {
  const offset: number = (page - 1) * perPage;
  const base = isClient ? baseURLClient : baseURLServer;
  const url: string = createUrlWithParams(base + API.ENDPOINT.THREAD, {
    offset: String(offset),
    count: String(perPage),
    // TODO: 丸め込み
    sort: "update",
    lang: lang,
  });
  return await fetchData(url);
};

export const fetchThreadDetail = async (
  threadId: string,
  lang: string,
  isClient?: boolean
) => {
  const base = isClient ? baseURLClient : baseURLServer;
  const params = { lang: lang };
  const url = createUrlWithParams(
    `${base}${API.ENDPOINT.THREAD}/${threadId}`,
    params
  );
  return await fetchData(url);
};

export const fetchThreadCount = async () => {
  const url = `${baseURLServer}${API.ENDPOINT.THREAD}/count`;
  return await fetchData(url);
};

export const fetchCommentData = async (
  threadId?: string,
  isClient?: boolean,
  lang?: string
) => {
  const base = isClient ? baseURLClient : baseURLServer;
  const params = {
    ...(threadId && { thread_id: threadId }),
    ...(lang && { lang: lang }),
  };
  const url = createUrlWithParams(`${base}${API.ENDPOINT.COMMENT}`, params);
  return await fetchData(url);
};

const sendData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("APIエラー: " + response.status);
    }

    return await response.json();
  } catch (error: any) {
    console.error("APIリクエストエラー:", error.message);
    throw error;
  }
};

export const sendCommentData = async (
  threadId: string,
  userId: string,
  userName: string,
  content: string,
  lang: string,
  imageFile?: File
) => {
  const formData = new FormData();
  formData.append('thread_id', threadId);
  formData.append('user_id', userId);
  formData.append('user_name', userName);
  formData.append('content', content);
  formData.append('language', lang);
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  // FormDataの中身を出力
  Array.from(formData.entries()).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
  const url = `${baseURLClient}${API.ENDPOINT.COMMENT}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      // レスポンスが正常でない場合、エラーメッセージを投げる
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // レスポンスの内容をJSONとして取得
    const data = await response.json();
    return data;
  } catch (error) {
    // ネットワークエラーやその他のエラーをキャッチ
    console.error('Fetch error:', error);
    throw error; // 必要に応じてエラーを再スロー
  }
};

export const sendThreadData = async (
  title: string,
  userId: string,
  userName: string,
  content: string,
  language: string
) => {
  const params = {
    title: title,
    user_id: userId,
    user_name: userName,
    content: content,
    language: language,
  };
  const url = createUrlWithParams(
    `${baseURLClient}${API.ENDPOINT.THREAD}`,
    params
  );
  return await sendData(url);
};

export const fetchCommentCountThreadData = async (
  page: number,
  perPage: number,
  isClient: boolean,
  lang: string
) => {
  const offset: number = (page - 1) * perPage;
  const base = isClient ? baseURLClient : baseURLServer;
  const url: string = createUrlWithParams(base + API.ENDPOINT.THREAD, {
    offset: String(offset),
    count: String(perPage),
    sort: "comment_count",
    lang: lang,
  });
  return await fetchData(url);
};

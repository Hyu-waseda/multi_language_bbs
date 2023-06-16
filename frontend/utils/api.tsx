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

export const fetchThreadData = async (count?: number) => {
  const url = createUrlWithParams(
    baseURLServer + API.ENDPOINT.THREAD,
    count ? { count: String(count) } : undefined
  );
  return await fetchData(url);
};

export const fetchSpecificThreadData = async (threadId: string) => {
  const url = `${baseURLServer}${API.ENDPOINT.THREAD}/${threadId}`;
  return await fetchData(url);
};

export const fetchCommentData = async (
  threadId?: string,
  isClient?: boolean
) => {
  const base = isClient ? baseURLClient : baseURLServer;
  const url = createUrlWithParams(
    `${base}${API.ENDPOINT.COMMENT}`,
    threadId ? { thread_id: threadId } : undefined
  );
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
  content: string
) => {
  const params = {
    thread_id: threadId,
    user_id: userId,
    user_name: userName,
    content: content,
  };
  const url = createUrlWithParams(
    `${baseURLClient}${API.ENDPOINT.COMMENT}`,
    params
  );
  return await sendData(url);
};

// GET関連
const fetchData = async (endpoint: string, params?: Record<string, string>) => {
  const baseUrl = process.env.API_BASE_URL_SERVER;
  let url = `${baseUrl}${endpoint}`;

  if (params) {
    const queryParams = new URLSearchParams(params);
    url += `?${queryParams.toString()}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("APIエラー: " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("APIリクエストエラー:", error.message);
    throw error;
  }
};

export const fetchThreadData = async (endpoint: string, count?: number) => {
  if (count) {
    const params = { count: String(count) };
    const res = await fetchData(endpoint, params);
    return res;
  } else {
    const res = await fetchData(endpoint);
    return res;
  }
};

export const fetchSpecificThreadData = async (endpoint: string) => {
  const res = await fetchData(endpoint);
  return res;
};

export const fetchCommentData = async (endpoint: string, threadId?: string) => {
  if (threadId) {
    const params = { thread_id: threadId };
    const res = await fetchData(endpoint, params);
    return res;
  } else {
    const res = await fetchData(endpoint);
    return res;
  }
};

// POST関連
const sendData = async (endpoint: string, params?: Record<string, string>) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_CLIENT;
  let url = `${baseUrl}${endpoint}`;

  if (params) {
    const queryParams = new URLSearchParams(params);
    url += `?${queryParams.toString()}`;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("APIエラー: " + response.status + response.body);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("APIリクエストエラー:", error.message);
    throw error;
  }
};

export const sendCommentData = (
  endpoint: string,
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
  const res = sendData(endpoint, params);
  return res;
};

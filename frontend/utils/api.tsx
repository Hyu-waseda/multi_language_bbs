export const fetchData = async (
  endpoint: string,
  params?: Record<string, string>
) => {
  const baseUrl = process.env.API_BASE_URL;
  let url = `${baseUrl}${endpoint}`;

  // パラメーターが指定されていれば、URLにクエリパラメーターを追加します
  if (params) {
    const queryParams = new URLSearchParams(params);
    url += `?${queryParams.toString()}`;
  }

  try {
    const response = await fetch(url);

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

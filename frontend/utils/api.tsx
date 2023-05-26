export const fetchData = async (endpoint: string) => {
  const baseUrl = process.env.API_BASE_URL;
  const url = `${baseUrl}${endpoint}`;

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

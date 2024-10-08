export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "An error occurred while fetching data."
    );
  }

  return response.json();
};

export const mutatePOSTFetcher = async (
  url: string,
  { arg }: { arg: object }
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return response.json();
};

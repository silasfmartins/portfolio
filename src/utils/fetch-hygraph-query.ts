export async function fetchHygraphQuery<T>(
  query: string,
  locale: string,
  revalidate?: number
): Promise<T> {
  const hygraphUrl = process.env.HYGRAPH_URL;
  const hygraphToken = process.env.HYGRAPH_TOKEN;

  if (!(hygraphUrl && hygraphToken)) {
    throw new Error(
      "Missing HYGRAPH_URL or HYGRAPH_TOKEN environment variables."
    );
  }

  const response = await fetch(hygraphUrl, {
    body: JSON.stringify({
      query,
    }),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${hygraphToken}`,
      "Content-Language": locale,
      "Content-Type": "application/json",
    },
    method: "POST",
    next: {
      revalidate,
    },
  });

  if (!response.ok) {
    const responseBody = await response.text();
    throw new Error(
      `Hygraph request failed with status ${response.status}: ${response.statusText}. ${responseBody.slice(
        0,
        180
      )}`
    );
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    const details =
      typeof payload.errors[0]?.message === "string"
        ? payload.errors[0].message
        : "Unknown GraphQL error";
    throw new Error(`Hygraph GraphQL error: ${details}`);
  }

  return payload.data;
}

export const fetchData = async (url, dataType) => {
  const response = await fetch(url);
  const resContentType = response.headers.get("content-type");

  if (
    !response.ok ||
    (dataType === "md" && !resContentType.includes("markdown")) ||
    (dataType === "json" && !resContentType.includes("Json"))
  ) {
    return Promise.reject(new console.error("!Fetch Data Failed"));
  }
  if (dataType === "md") {
    return response.text();
  } else if (dataType === "json") {
    return response.json();
  }
  return Promise.reject(`Not Support Data Type ${dataType}!`);
};

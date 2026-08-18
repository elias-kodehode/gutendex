import { useQuery } from "@tanstack/react-query";

export function getBooksByCategory(category, currentPage) {
  const cache_expiration = 30;

  return useQuery({
    queryKey: [
      "books",
      category ,
      currentPage,
    ],
    queryFn: () => fetchBooks(category , currentPage ),
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * cache_expiration, //30 min
  });
}

async function fetchBooks(category, page) {
  const url = "https://gutendex.com/books?";
  console.time(`Fetching ${category}`);

  const params = new URLSearchParams({
    topic: category || "none",
    page: page || 1,
  });


  if(params.get("topic") === "none"){
    params.delete("topic");
  }
  console.log(`Fetching from ${url}${params.toString()}`);
  const response = await fetch(`${url}${params.toString()}`);
  const data = await response.json();

  console.timeEnd(`Fetching ${category}`);
  return data;
}

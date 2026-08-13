import { useQuery } from "@tanstack/react-query";

export function getBooksByCategory(category, currentPage) {
  const cache_expiration = 30;
  const fallbackCategory = "fiction";

  return useQuery({
    queryKey: ["books", category || fallbackCategory, currentPage],
    queryFn: () => fetchBooks(category || fallbackCategory, currentPage),
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * cache_expiration, //30 min
  });
}

async function fetchBooks(category, page) {
  console.time(`Fetching ${category}`);

  const params = new URLSearchParams({
    topic: category,
    page: page,
  });

  console.log("Params: ", params);

  const response = await fetch(
    `https://gutendex.com/books?${params.toString()}`,
  );
  const data = await response.json();

  console.timeEnd(`Fetching ${category}`);
  return data;
}

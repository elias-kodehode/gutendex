import { useQuery } from "@tanstack/react-query";

export default function getBookById(bookId) {
  const cache_expiration = 30;

  return useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBookById(bookId),
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * cache_expiration, //30 min
  });
}

async function fetchBookById(id) {
  console.time(`Fetching book with id ${id}`);
  const response = await fetch(`https://gutendex.com/books/${id}`, {
    method: "GET",
  });
  const result = await response.json();
  console.log(result);
  console.timeEnd(`Fetching book with id ${id}`);
  return result;
}

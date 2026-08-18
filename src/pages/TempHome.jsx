import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEventListener } from "../hooks/eventListener";
import { getBooksByCategory } from "../queries/getBooksByCategory";
import { Box, LinearProgress, Stack } from "@mui/material";
import Link from "../components/Link";

export default function TempHome() {
  // const { category, page } = useParams();
  const [category, setCategory] = useState("none");

  const listener = useEventListener("onCategoryChanged", (e) => {
    setCategory(e.category);
  });

  useEffect(() => {
    console.log("Category:", category);
  }, [category]);

  useEffect(() => {
    console.log("DATA:", data);
  }, [data]);

  const { data, isLoading, isError, error, isFetching } = getBooksByCategory(
    category,
    1,
  );

  if (isLoading) {
    return (
      <>
        <LinearProgress />
        <small>Fetching books from "{category}"</small>
      </>
    );
  }

  const totalPages = Math.ceil(data.count / 32);

  return (
    <>
      {isFetching && (
        <>
          <LinearProgress />
          <small>Loading Page: {0}</small>
        </>
      )}
      <BookList category={category} books={data.results} />
    </>
  );
}

function Book({ book }) {
  const { title, formats, download_count, languages } = book;
  return <Link to={formats["text/html"]}>{title}</Link>;
}

function BookList({ category, books }) {
  return (
    <>
      <h1>{category.toUpperCase()}</h1>
      <ul>
        {books.map((book) => (
          <Book book={book} key={book.id} />
        ))}
      </ul>
    </>
  );
}

//   <Stack spacing={2} direction={"column"}>
//     {data.results.map((c, i) => (
//       <Book key={i} book={c} />
//     ))}
//   </Stack>

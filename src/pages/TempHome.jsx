import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEventListener } from "../hooks/eventListener";
import { getBooksByCategory } from "../queries/getBooksByCategory";
import { Box, LinearProgress, Pagination, Stack } from "@mui/material";
import Link from "../components/Link";

export default function TempHome() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  //get page number from query parameters, defaulting to 1 if not present
  const page = Number(searchParams.get("page")) || 1;

  //listen for category selection, and navigating accordingly
  const listener = useEventListener("onCategoryChanged", (e) => {
    const c = e.category.toLowerCase();
    if (c === "none") {
      //if category is "none", redirect to root
      navigate("/");
      return;
    }
    //Else redirect to "/category/"
    navigate("/" + c);
  });

  //manually set search parameters
  const handlePageChanged = (_, value) => {
    setSearchParams({ page: value });
  };


  const { data, isLoading, isError, error, isFetching } = getBooksByCategory(
    category,
    page,
  );

  if (isLoading) {
    return (
      <>
        <LinearProgress />
        <small>Loading...</small>
        {/* <small>Fetching books from "{category.toUpperCase()}"</small> */}
      </>
    );
  }

  const totalPages = Math.ceil(data.count / 32);

  return (
    <>


      {isFetching && (
        <>
          <LinearProgress />
          <small>Loading {category.toUpperCase()} Page: {page}</small>
        </>
      )}

      <BookList category={category} books={data.results} />
      {isFetching && (
        <>
          <LinearProgress />
          <small>Loading {category.toUpperCase()} Page: {page}</small>
        </>
      )}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChanged}
      />
    </>
  );
}

function Book({ book }) {
  const { title, formats, download_count, languages, id } = book;
  return <Link to={`/books/${id}`}>{title}</Link>;
  // return <Link to={formats["text/html"]}>{title}</Link>;
}

function BookList({ category, books }) {
  return (
    <Stack spacing={2}>
      {/* <h1>{category.toUpperCase()}</h1> */}
      {books.map((book) => (
        <Book book={book} key={book.id} />
      ))}
    </Stack>
  );
}

//   <Stack spacing={2} direction={"column"}>
//     {data.results.map((c, i) => (
//       <Book key={i} book={c} />
//     ))}
//   </Stack>

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
  useEventListener("onCategoryChanged", ({ category }) => {
    const normalizedCategory = category.toLowerCase();
    navigate(normalizedCategory === "none" ? "/" : `/${normalizedCategory}`);
  });

  //manually set search parameters
  const handlePageChanged = (_, value) => {

    setSearchParams((params) => {
      params.set("page", value);
      return params;
    });
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

  if (isError) {
    return <p>{error}</p>
  }

  const totalPages = Math.ceil(data.count / 32);

  return (
    <>
      {isFetching && (
        <>
          <LinearProgress />
          <small>Loading {category?.toUpperCase()} Page: {page}</small>
        </>
      )}

      <BookList books={data.results} />
      {isFetching && (
        <>
          <LinearProgress />
          <small>Loading {category?.toUpperCase()} Page: {page}</small>
        </>
      )}
      <BookPagination onPageChanged={handlePageChanged} page={page} totalPages={totalPages} />
    </>
  );
}

function BookPagination({ page, totalPages, onPageChanged }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={onPageChanged}
        sx={{
          width: '100%',
          '& .MuiPagination-ul': {
            width: '100%',
            justifyContent: 'space-evenly',
          },
        }}
      />
    </Box>);
}

function Book({ book }) {
  const { title, id } = book;
  return <Link to={`/books/${id}`}>{title}</Link>;
}

function BookList({ books }) {
  return (
    <Stack spacing={2}>
      {books.map((book) => (
        <Book book={book} key={book.id} />
      ))}
    </Stack>
  );
}

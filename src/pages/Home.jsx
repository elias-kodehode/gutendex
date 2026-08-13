import { useEffect, useState } from "react";
import { useParams, useSearchParams, NavLink, useNavigate } from "react-router-dom";
import Link from "../components/Link"
import { useQuery } from "@tanstack/react-query";
import { Button, CircularProgress, LinearProgress, Pagination, PaginationItem } from "@mui/material";


async function fetchBooks(category, page) {
  console.time(`Fetching ${category}`)

  const params = new URLSearchParams({
    topic: category,
    page: page
  });


  console.log("Params: ", params);
  //?topic=${category}&page=${page}
  const response = await fetch(`https://gutendex.com/books?${params.toString()}`);
  const data = await response.json();

  console.timeEnd(`Fetching ${category}`)
  return data;
}

export default function Home() {


  const { category, page } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentPage = Number(page) || 1;


  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["books", category, currentPage],
    queryFn: () => fetchBooks(category, currentPage),
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * 30 //30 min
  })

  if (isLoading) {
    return <>
      <LinearProgress />
      <small>Fetching books from "{category}"</small>
    </>
  }


  if (isError) {
    return <p>{error.message}</p>
  }
  const totalPages = Math.ceil(data.count / 32);

  return (
    <>
      {isFetching && <>
        <LinearProgress />
        <small>Loading Page: {currentPage}</small>
      </>}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => {
          navigate(`/books/category/${category}/${value}`);
        }}
      />
      <BookList category={category} books={data.results} />
    </>
  );
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

function Book({ book }) {
  return (
    <li className="book">
      <Link to={`/books/${book.id}`}>
        {book.title}
      </Link>
    </li>);
}


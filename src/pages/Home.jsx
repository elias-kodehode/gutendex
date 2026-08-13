import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Link from "../components/Link";
import {
  Button,
  CircularProgress,
  LinearProgress,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { getBooksByCategory } from "../query/getBooksByCategory";

export default function Home() {
  const { category, page } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentPage = Number(page) || 1;

  const { data, isLoading, isError, error, isFetching } = getBooksByCategory(
    category,
    currentPage,
  );

  if (isLoading) {
    return (
      <>
        <LinearProgress />
        <small>Fetching books from "{category}"</small>
      </>
    );
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const totalPages = Math.ceil(data.count / 32);

  return (
    <>
      {isFetching && (
        <>
          <LinearProgress />
          <small>Loading Page: {currentPage}</small>
        </>
      )}

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
      <h1>{category}</h1>
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
      <Link to={`/books/id/${book.id}`}>{book.title}</Link>
    </li>
  );
}

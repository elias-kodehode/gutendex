import { Button, Card, CardContent, CardHeader, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "../components/Link";
import getBookById from "../queries/getBookById";

export default function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  const { data, isLoading, isError, error, isFetching } = getBookById(bookId);

  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  const { title, formats, download_count, languages } = data;

  return (
    <div>
      {isFetching && <p>fetching..</p>}
      <h1>{title}</h1>
      <small>Downloads: {download_count}</small>
      <img src={formats["image/jpeg"]} />

      <ul>
        <h2>Languages</h2>
        {languages.map((lang, id) => (
          <li key={id}>{lang.toUpperCase()}</li>
        ))}
      </ul>

      <Link to={formats["text/html"]}>Hi</Link>
      <Button>Favourite</Button>
    </div>
  );
}

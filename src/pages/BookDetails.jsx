import { Button, Card, CardContent, CardHeader, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "../components/Link";

async function fetchBookById(id) {

    const response = await fetch(`https://gutendex.com/books/${id}`, {
        method: "GET",

    });
    const result = await response.json();
    console.log(result);
    return result;
}

export default function BookDetails() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["book", bookId],
        queryFn: () => fetchBookById(bookId),
        placeholderData: (previous) => previous,
        staleTime: 1000 * 60 * 30 //30 min
    });

    if (isLoading) {
        return <p>Loading..</p>
    }
    if (isError) {
        return <p>{error.message}</p>
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
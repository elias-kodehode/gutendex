import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


async function fetchBooks(category, page){
    console.time(`Fetching ${category}`)

    const params = new URLSearchParams({
      topic: category,
      page: page
    });
    
    //?topic=${category}&page=${page}
    const response = await fetch(`https://gutendex.com/books?${params.toString()}`);
    const data = await response.json();

    console.timeEnd(`Fetching ${category}`)
    return data;
}

export default function Home() {
    const {category} = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const {data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["books", category],
        queryFn: () => fetchBooks(category, page),
        placeholderData: (previous) => previous,
        staleTime: 1000 * 60 * 30 //30 min
    })

    if(isLoading){
        return <p>Loading...</p>;
    }

    if(isFetching){
      return (<small>Fetching {category}</small>)
    }
    


  return (
      <BookList books={data.results}/>
  );
}


function BookList({category,books}){
  return(
    <>
      <h1>{category ?? "All books"}</h1>
      <ul>
        {books.map((book) => (
              <Book book={book} key={book.id}/>
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
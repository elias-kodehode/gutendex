import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

async function fetchBookById(id) {
    console.time(`Fetching ${id}`)


    const response = await fetch(`https://gutendex.com/books/${id}`);
    const data = await response.json();
    console.log(data)
    console.timeEnd(`Fetching ${id}`)
    return data;
}


export default function Books() {
    const { bookId } = useParams();

    const { data: book, isFetching, isLoading } = useQuery({
        queryKey: ["book", bookId],
        queryFn: () => fetchBookById(bookId),
        placeholderData: (previous) => previous,
        staleTime: 1000 * 60 * 30 //30 min
    });

    if(isFetching || isLoading)
    {
        return <p>Fetching information..</p>
    }

    if(!book){
        <p>Book not found</p>
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <Summary book={book}/>
        </div>
    );
}


function Summary({book}){

    return (
        <div className="summary">
            <img src={book.formats["image/jpeg"] ?? ""}/>
            <h2>Summary</h2>
            {book.summaries.map((summary, index) => {
                return (<p key={index}>{summary}</p>);
            })}
        </div>
    );
}
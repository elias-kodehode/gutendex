import { useParams } from "react-router-dom";

async function fetchBookById(id) {
    console.time(`Fetching ${id}`)


    const response = await fetch(`https://gutendex.com/books/${id}`);
    const data = await response.json();

    console.timeEnd(`Fetching ${id}`)
    return data;
}


async function fetchBooksByTitle(title) {
    console.time(`Fetching ${title}`)
    const params = new URLSearchParams({
        search: title,
    });
    console.timeEnd(`Fetching ${title}`)
}

export default function Books() {
    const { id } = useParams();

    const { data: book } = useQuery({
        queryKey: ["book", id],
        queryFn: () => fetchBookById(id),
    });

    const { data: searchResults } = useQuery({
        queryKey: ["books", title],
        queryFn: () => fetchBooksByTitle(title),
    });

    return (
        <div>

        </div>
    );
}
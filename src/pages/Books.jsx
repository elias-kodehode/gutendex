async function fetchBook({query}){
    console.time(`Fetching ${category}`)

    const params = new URLSearchParams({
        title: query.title ?? null
    });
    
    const response = await fetch(`https://gutendex.com/books?${params.toString()}`);
    const data = await response.json();

    console.timeEnd(`Fetching ${category}`)
    return data;
}

export default function Books() {

    //fetch specific book by id
  return (
    <div>
      
    </div>
  );
}
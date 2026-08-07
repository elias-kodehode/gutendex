import { useEffect, useState } from 'react'
import './App.css'


export default function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {


    async function fetchData(){
      const response = await fetch("https://gutendex.com/books");
      console.log(await response.json())
    }

    fetchData();
},[]);


  
  return (
    <>

    </>
  )
}

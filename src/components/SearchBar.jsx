import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => { }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <TextField
      fullWidth
      id="outlined-basic"
      label="Search"
      variant="outlined"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

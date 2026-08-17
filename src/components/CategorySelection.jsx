import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import emit from "../emit"

export default function CategorySelection() {

    const [category, setCategory] = useState(categories[0]);

    useEffect(() => {
        emit("onCategoryChanged", {
            category
        })
    }, [category]);

    return (
        <FormControl fullWidth>
            <InputLabel id="category-select">Category</InputLabel>
            <Select
                labelId="category-select"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}>

                {categories.map((cat, index) => (
                    <MenuItem value={cat}>{cat}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

const categories = [
    "None",
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
];
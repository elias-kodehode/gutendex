import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEventListener } from "../hooks/eventListener";
import { getBooksByCategory } from "../queries/getBooksByCategory";
import { LinearProgress } from "@mui/material";

export default function TempHome() {
    // const { category, page } = useParams();
    const [category, setCategory] = useState("none");

    const listener = useEventListener("onCategoryChanged", (e) => {
        setCategory(e.category);
    });


    // useEffect(() => {
    //     console.log(category);
    // }, [category]);

    const { data, isLoading, isError, error, isFetching } = getBooksByCategory(
        category,
        1,
    );

    useEffect(() => {
        // console.log(data);
    }, [data]);
    return (
        <>
            {isFetching && (
                <>
                    <LinearProgress />
                    <small>Loading Page: {1}</small>
                </>
            )}
        </>
    );
}
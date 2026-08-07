import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BooksLayout from "../layouts/BooksLayout"
import NotFound from "../components/NotFound";
import Home from "../pages/Home";
import Books from "../pages/Books";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/:category", element: <Home/>},
            // { path: "/books/:book", element: <Books/>}
        ]
    },
    {
        path: "/books/",
        element: <BooksLayout/>,
        children: [
            {index: true, element: <Books/>},
            {path: "/books/:book", element: <Books/>}
        ]
    },
    { path: "*", element: <NotFound /> }
]);
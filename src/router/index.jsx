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
        ]
    },
    {
        path: "/books",
        element: <BooksLayout/>,
        children: [
            { index: true, element: <Books/>},
            { path: "/books/:bookId", element: <Books/>}
        ]
    },
    { path: "*", element: <NotFound /> }
]);
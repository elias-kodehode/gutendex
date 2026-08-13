import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/NotFound";
import Home from "../pages/Home";
import Books from "../pages/Books";
import BookDetails from "../pages/BookDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/books/category/:category", element: <Navigate to={"1"} replace /> },
            { path: "/books/category/:category/:page", element: <Home /> },
            { path: "/books/:bookId", element: <BookDetails /> },
        ]
    },
    { path: "*", element: <NotFound /> }
]);
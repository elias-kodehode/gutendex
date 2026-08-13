import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/NotFound";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            // { index: true, element: <Home /> },
            {index: true, element:<Navigate to={"/books/category"} replace />},
            { path: "/books/category/:category", element: <Navigate to={"1"} replace /> },
            { path: "/books/category/", element: <Navigate to={"fiction/1"} replace /> },
            { path: "/books/category/:category/:page", element: <Home /> },
            { path: "/books/id/:bookId", element: <BookDetails /> },
        ]
    },
    { path: "*", element: <NotFound /> }
]);
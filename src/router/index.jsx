import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/NotFound";
import BookDetails from "../pages/BookDetails";
import Home from "../pages/Home";
import BookLayout from "../layouts/BookLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/:category", element: <Home /> },
    ]
  },
  {
    path: "/books/:bookId", element: <BookLayout />,
    children: [
      { index: true, element: <BookDetails /> },
      { path: "/books/:bookId", element: <BookDetails /> }
    ]
  },
  { path: "*", element: <NotFound /> },
]);

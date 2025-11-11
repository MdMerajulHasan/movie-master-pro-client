import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies";
import AddMovie from "../pages/AddMovie";
import MovieDetails from "../pages/MovieDetails";
import UpdateMovie from "../pages/UpdateMovie";
import MyCollection from "../pages/MyCollection";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "/movies", element: <AllMovies></AllMovies> },
      { path: "/movies/add", element: <AddMovie></AddMovie> },
      { path: "/movies/:id", element: <MovieDetails></MovieDetails> },
      { path: "/movies/update/:id", element: <UpdateMovie></UpdateMovie> },
      { path: "/movies/my-collection", element: <MyCollection></MyCollection> },
    ],
  },
]);

export default router;

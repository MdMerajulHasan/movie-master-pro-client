import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies";
import AddMovie from "../pages/AddMovie";
import MovieDetails from "../pages/MovieDetails";
import UpdateMovie from "../pages/UpdateMovie";
import MyCollection from "../pages/MyCollection";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/movies"),
        Component: Home,
      },
      {
        path: "/movies",
        loader: () => fetch("http://localhost:3000/movies"),
        element: <AllMovies></AllMovies>,
      },
      { path: "/movies/add", element: <AddMovie></AddMovie> },
      { path: "/movies/:id", element: <MovieDetails></MovieDetails> },
      { path: "/movies/update/:id", element: <UpdateMovie></UpdateMovie> },
      { path: "/movies/my-collection", element: <MyCollection></MyCollection> },
      { path: "/login", element: <Login></Login> },
      { path: "/registration", element: <Registration></Registration> },
    ],
  },
]);

export default router;

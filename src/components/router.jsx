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
import Error404 from "../pages/Error404";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error404></Error404>,
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
      {
        path: "/movies/add",
        element: (
          <PrivateRoute>
            <AddMovie></AddMovie>
          </PrivateRoute>
        ),
      },
      {
        path: "/movies/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movies/${params.id}`),
        element: <MovieDetails></MovieDetails>,
      },
      {
        path: "/movies/update/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movies/${params.id}`),
        element: <UpdateMovie></UpdateMovie>,
      },
      {
        path: "/movies/my-collection/:email",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movies/my-collection/${params.email}`),
        element: (
          <PrivateRoute>
            <MyCollection></MyCollection>
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/registration", element: <Registration></Registration> },
    ],
  },
]);

export default router;

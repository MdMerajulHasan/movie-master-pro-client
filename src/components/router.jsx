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
import WatchList from "../pages/WatchList";
import FAQ from "../pages/FAQ";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error404></Error404>,
    children: [
      {
        index: true,
        loader: () => fetch("https://movie-master-pro-api.vercel.app/movies"),
        Component: Home,
      },
      {
        path: "/movies",
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
          fetch(`https://movie-master-pro-api.vercel.app/movies/${params.id}`),
        element: <MovieDetails></MovieDetails>,
      },
      {
        path: "/movies/update/:id",
        loader: ({ params }) =>
          fetch(`https://movie-master-pro-api.vercel.app/movies/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateMovie></UpdateMovie>
          </PrivateRoute>
        ),
      },
      {
        path: "/movies/my-collection",
        element: (
          <PrivateRoute>
            <MyCollection></MyCollection>
          </PrivateRoute>
        ),
      },
      {
        path: "/watch-list/:email",
        loader: ({ params }) =>
          fetch(
            `https://movie-master-pro-api.vercel.app/watch-list/${params.email}`
          ),
        element: (
          <PrivateRoute>
            <WatchList></WatchList>
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/registration", element: <Registration></Registration> },
      { path: "/faq", element: <FAQ></FAQ> },
    ],
  },
]);

export default router;

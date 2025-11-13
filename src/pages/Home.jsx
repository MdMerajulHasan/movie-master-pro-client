import { useLoaderData } from "react-router";
import CarouselSlider from "../components/CarouselSlider";

const Home = () => {
  const movies = useLoaderData();
  return (
    <div className="mt-5 md:mt-10">
      <CarouselSlider movies={movies}></CarouselSlider>
    </div>
  );
};

export default Home;

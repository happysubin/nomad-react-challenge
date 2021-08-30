import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { moviesApi } from "../api";
import Loader from "../Component/Loader";
import Poster from "../Component/Poster";
import Section from "../Component/Section";

const useMovie = () => {
  const [state, setState] = useState({
    nowPlaying: null,
    upcoming: null,
    popular: null,
    loading: true,
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const {
          data: { results: popular },
        } = await moviesApi.popular();
        const {
          data: { results: upcoming },
        } = await moviesApi.upcoming();
        const {
          data: { results: nowPlaying },
        } = await moviesApi.nowPlaying();
        setState({ popular, upcoming, nowPlaying, loading: false });
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, []);
  return state;
};

const MovieBox = () => {
  const { nowPlaying, upcoming, popular, loading } = useMovie();
  return loading ? (
    <Loader />
  ) : (
    <>
      <Section>
        {nowPlaying &&
          nowPlaying.length > 0 &&
          nowPlaying.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              title={movie.original_title}
              year={movie.release_date.substr(0, 4)}
              isMovie={true}
            />
          ))}
      </Section>
      <Section>
        {upcoming &&
          upcoming.length > 0 &&
          upcoming.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              title={movie.original_title}
              year={movie.release_date.substr(0, 4)}
              isMovie={true}
            />
          ))}
      </Section>
      <Section>
        {popular &&
          popular.length > 0 &&
          popular.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              title={movie.original_title}
              year={movie.release_date.substr(0, 4)}
              isMovie={true}
            />
          ))}
      </Section>
    </>
  );
};

export default MovieBox;

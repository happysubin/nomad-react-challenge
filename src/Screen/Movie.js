import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { moviesApi } from "../api";
import Loader from "../Component/Loader";
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

const MovieBox = (props) => {
  const { nowPlaying, upcoming, popular, loading } = useMovie();
  console.log(nowPlaying, upcoming, popular);
  console.log(props);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Section>
        {nowPlaying &&
          nowPlaying.length > 0 &&
          nowPlaying.map((movie) => <h4>{movie.title}</h4>)}
      </Section>
      <Section>
        {upcoming &&
          upcoming.length > 0 &&
          upcoming.map((movie) => <h4>{movie.title}</h4>)}
      </Section>
      <Section>
        {popular &&
          popular.length > 0 &&
          popular.map((movie) => <h4>{movie.title}</h4>)}
      </Section>
    </>
  );
};

export default MovieBox;

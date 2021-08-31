import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { tvApi } from "../api";
import Loader from "../Component/Loader";
import Message from "../Component/Message";
import Poster from "../Component/Poster";
import Section from "../Component/Section";

const useTv = () => {
  const [state, setState] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
  });
  useEffect(() => {
    const fetchTv = async () => {
      try {
        const {
          data: { results: topRated },
        } = await tvApi.topRated();
        const {
          data: { results: popular },
        } = await tvApi.popular();
        const {
          data: { results: airingToday },
        } = await tvApi.airingToday();
        setState({ airingToday, topRated, popular, loading: false });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTv();
  }, []);
  return state;
};

const TvBox = () => {
  const { loading, airingToday, topRated, popular } = useTv();
  return loading ? (
    <>
      <Helmet>
        <title>Loading.. | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      <Helmet>
        <title>Tv | Nomflix</title>
      </Helmet>
      <Section>
        {airingToday &&
          airingToday.length > 0 &&
          airingToday.map((tv) => (
            <Poster
              title={tv.original_name}
              rating={tv.vote_average}
              id={tv.id}
              key={tv.id}
              imageUrl={tv.poster_path}
              year={tv.first_air_date ? tv.first_air_date.substr(0, 4) : ""}
              isMovie={false}
            />
          ))}
      </Section>
      <Section>
        {topRated &&
          topRated.length > 0 &&
          topRated.map((tv) => (
            <Poster
              title={tv.original_name}
              rating={tv.vote_average}
              id={tv.id}
              key={tv.id}
              imageUrl={tv.poster_path}
              year={tv.first_air_date ? tv.first_air_date.substr(0, 4) : ""}
              isMovie={false}
            />
          ))}
      </Section>
      <Section>
        {popular &&
          popular.length > 0 &&
          popular.map((tv) => (
            <Poster
              title={tv.original_name}
              rating={tv.vote_average}
              id={tv.id}
              key={tv.id}
              imageUrl={tv.poster_path}
              year={tv.first_air_date ? tv.first_air_date.substr(0, 4) : ""}
              isMovie={false}
            />
          ))}
      </Section>
    </>
  );
};
export default TvBox;

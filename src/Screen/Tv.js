import React, { useEffect, useState } from "react";
import { tvApi } from "../api";
import Loader from "../Component/Loader";
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
    <Loader />
  ) : (
    <>
      <Section>
        {airingToday &&
          airingToday.length > 0 &&
          airingToday.map((tv) => <h4>{tv.name}</h4>)}
      </Section>
      <Section>
        {topRated &&
          topRated.length > 0 &&
          topRated.map((tv) => <h4>{tv.name}</h4>)}
      </Section>
      <Section>
        {popular &&
          popular.length > 0 &&
          popular.map((tv) => <h4>{tv.name}</h4>)}
      </Section>
    </>
  );
};
export default TvBox;

import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../api";
import styled from "styled-components";
import Loader from "../Component/Loader";
import Helmet from "react-helmet";
import Season from "../Component/Season";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const SeasonContainer = styled.div`
  display: flex;
`;

const List = styled.ul`
  display: flex;
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  margin-bottom: 10px;
`;
const useDetail = (id, path) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    isMovie: path.includes("/movie"),
  });
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (state.isMovie) {
          const { data } = await moviesApi.movieDetail(id);
          setState({ data, loading: false });
        } else {
          const { data } = await tvApi.showDetail(id);
          setState({ data, loading: false });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetail();
  }, []);
  return state;
};

const useTabs = () => {
  const [tabs, setTabs] = useState();

  return { tabs, setTabs };
};

const useSeason = () => {
  const [season, setSeason] = useState();
  return { season, setSeason };
};

const Detail = (props) => {
  const {
    match: {
      path,
      params: { id },
    },
  } = props;
  const { loading, data: result } = useDetail(id, path);
  const { tabs, setTabs } = useTabs();
  const { season, setSeason } = useSeason();
  console.log(result);
  console.log(tabs);
  console.log(season);
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <BackDrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../assets/noPosterSmall.jpg").default
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.runtime
                ? result.runtime
                : result.episode_run_time
                ? result.episode_run_time[0]
                : ""}{" "}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>
              <a href={`https://www.imdb.com/title/${result.imdb_id}`}>
                GO IMDB
              </a>
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <ItemContainer>
            <List>
              <Item>
                <Button
                  onClick={() =>
                    result.videos.results.length !== 0
                      ? setTabs({
                          value: result.videos.results[0].key,
                          isVideo: true,
                        })
                      : setTabs()
                  }
                >
                  Video
                </Button>
                <Button
                  onClick={() =>
                    setTabs({
                      value: result.production_countries[0].iso_3166_1,
                      isVideo: false,
                    })
                  }
                >
                  Production_countries
                </Button>
                <Button
                  onClick={() =>
                    result.production_companies.length !== 0
                      ? setTabs({
                          value: result.production_companies[0].name,
                          isVideo: false,
                        })
                      : setTabs()
                  }
                >
                  Production_Company
                </Button>
                <Button
                  onClick={() =>
                    result.seasons ? setSeason(result.seasons) : setSeason()
                  }
                >
                  Season
                </Button>
              </Item>
            </List>
          </ItemContainer>
          {tabs ? (
            tabs.isVideo ? (
              <iframe
                width="300"
                src={`https://www.youtube.com/embed/${tabs.value}?rel=0&amp;autoplay=1&mute=1&amp;loop=1;playlist=${tabs.value}`}
                frameborder="0"
              ></iframe>
            ) : (
              <p>{tabs.value}</p>
            )
          ) : (
            ""
          )}

          <SeasonContainer>
            {season &&
              season.length > 0 &&
              season.map((content) => (
                <Season name={content.name} poster={content.poster_path} />
              ))}
          </SeasonContainer>
        </Data>
      </Content>
    </Container>
  );
};

/*
<Item>
              
              {result.production_countries
                ? result.production_countries[0].iso_3166_1
                : ""}
            </Item>
*/

export default Detail;

import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../api";
import styled from "styled-components";
import Loader from "../Component/Loader";
import { Link } from "react-router-dom";

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

const List = styled.ul`
  display: flex;
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
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

const useTabs = (country) => {
  const [tabs, setTabs] = useState();

  return { tabs, setTabs };
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
  console.log(result);
  return loading ? (
    <Loader />
  ) : (
    <Container>
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
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
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
              <a href={`https://www.imdb.com/title/${result.imdb_id}`}>IMDB</a>
            </Item>
            <Divider>•</Divider>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <ItemContainer>
            <List>
              <Item>
                <Button onClick={setTabs}>Video</Button>
                <Button
                  onClick={() =>
                    setTabs(result.production_countries[0].iso_3166_1)
                  }
                >
                  Production_countries
                </Button>
                <Button>Production_Company</Button>
              </Item>
            </List>
          </ItemContainer>
          <p>{tabs ? tabs : ""}</p>
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

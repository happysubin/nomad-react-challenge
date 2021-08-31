import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { moviesApi, tvApi } from "../api";
import Loader from "../Component/Loader";
import Section from "../Component/Section";
import Poster from "../Component/Poster";
import Message from "../Component/Message";

const Container = styled.div`
  padding: 0px 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState({
    Term: "",
    loading: false,
    tvResult: null,
    movieResult: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.Term !== "") {
      search(searchTerm.Term);
    }
  };
  //submit되는 순간 실행된다.

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;

    setSearchTerm({ Term: value });
  };
  //우리는  input의 값이 바뀌는 순간마다 이 함수를 실행. 계속 setSearchTerm 으로 state를 바꾼다. submit와는 다름
  const search = async (term) => {
    try {
      setSearchTerm({ loading: true });

      const {
        data: { results: tvResult },
      } = await tvApi.search(term);
      const {
        data: { results: movieResult },
      } = await moviesApi.search(term);
      console.log(movieResult);
      setSearchTerm({ tvResult, movieResult, loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSubmit, updateTerm, searchTerm };
};

const SearchBox = () => {
  const {
    handleSubmit,
    updateTerm,
    searchTerm: { loading, movieResult, tvResult, Term },
  } = useSearch();

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Searches.. Movies or Shows"
          value={Term}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResult && movieResult.length > 0 && (
            <Section>
              {movieResult.map((movie) => (
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
          )}
          {tvResult && tvResult.length > 0 && (
            <Section>
              {tvResult.map((show) => (
                <Poster
                  id={show.id}
                  key={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={
                    show.first_air_date
                      ? show.first_air_date.substring(0, 4)
                      : ""
                  }
                  isMovie={false}
                />
              ))}
            </Section>
          )}
          {tvResult &&
            movieResult &&
            tvResult.length < 1 &&
            movieResult.length < 1 && (
              <Message text="Nothing found" color="#95a5a6" />
            )}
        </>
      )}
    </Container>
  );
};
export default SearchBox;

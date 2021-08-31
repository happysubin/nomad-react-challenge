import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 15px 0px 0px;
`;

const Title = styled.p`
  margin-bottom: 15px;
  font-size: 15px;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const Season = ({ name, poster }) => (
  <Container>
    <Title>{name}</Title>
    <Img
      src={`https://image.tmdb.org/t/p/original/${poster}`}
      alt="no Image"
    ></Img>
  </Container>
);

export default Season;

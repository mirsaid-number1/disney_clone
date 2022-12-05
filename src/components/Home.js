import React, { useEffect, useState, createContext } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Recommends from "./Recommends";
import Viewers from "./Viewers";
import Originals from "./Originals";
import Trending from "./Trending";
import db from "../main";
import NewDisney from "./NewDisney";
export const firebaseData = createContext();
function Home() {
  let [details, setDetails] = useState([]);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

 
  useEffect(() => {
    const getInfoFromFirebase = [];
    const subscriber = db.collection("movies").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getInfoFromFirebase.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDetails(getInfoFromFirebase);
    });

    return () => subscriber();
  }, []);
  (function () {
    details.map((item) => {
      switch (item.type) {
        case "recommend":
          recommends.push(item);
          break;

        case "new":
          newDisneys.push(item);
          break;

        case "original":
          originals.push(item);
          break;

        case "trending":
          trending.push(item);
          break;
      }
    });
  })();

  console.log(recommends);
  console.log(newDisneys);
  console.log(originals);
  console.log(trending);
  console.log(details);
  return (
    <firebaseData.Provider
      value={{
        recommends: recommends,
        newDisneys: newDisneys,
        originals: originals,
        trending: trending,
      }}
    >
      <Container>
        <ImgSlider />
        <Viewers />
        <Recommends />
        <Originals />
        <Trending />
        <NewDisney />
      </Container>
    </firebaseData.Provider>
  );
}
const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
export default Home;
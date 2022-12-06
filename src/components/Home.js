import React, { useEffect,useState, createContext } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Recommends from "./Recommends";
import Viewers from "./Viewers";
import Originals from "./Originals";
import Trending from "./Trending";
import db from "../main";
import NewDisney from "./NewDisney";
import {collection,getDocs} from 'firebase/firestore'
export const firebaseData = createContext();
function Home() {
  let [recommends,setRecommends] = useState([]);
  let [newDisneys,setNewDisneys] = useState([]);
  let [originals,setOriginals] = useState([]);
  let [trending,setTrending] = useState([]);
  let films = collection(db,"movies");

  useEffect(() => {
    getDocs(films).then(docs => {
      docs.forEach(doc => {
        switch (doc.data().type) {
          case "recommend":
            setRecommends(prev => [...prev,{id: doc.id, ...doc.data()}]);
            break;
  
          case "new":
            setNewDisneys(prev => [...prev,{id: doc.id, ...doc.data()}]);
            break;
  
          case "original":
            setOriginals(prev => [...prev,{id: doc.id, ...doc.data()}]);
            break;
  
          case "trending":
            setTrending(prev => [...prev,{id: doc.id, ...doc.data()}]);
            break;
          default:
            return {id: doc.id, ...doc.data()}
        }
      })
    });
  },[])

  console.log(recommends);
  console.log(newDisneys);
  console.log(originals);
  console.log(trending);
  return (
    <firebaseData.Provider
      value={{
        recommends,
        newDisneys,
        originals,
        trending,
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
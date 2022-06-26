import styled from "styled-components";
import ToggleThemeButton from "./component/ToggleThemeButton";
import Hero from "./component/Hero";
import ResultContainer from "./component/ResultContainer";
import Footer from "./component/Footer";
import "./App.css";
import { useEffect, useState } from "react";
import getWallPapers from "./api/getWallpaers";
const Container = styled.div`
  position: relative;
  background-color: var(--primary);
  min-height: 100vh;
`;

function App() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  //   const data = DummyData;
  useEffect(() => {
    const fetch = async () => {
      const data = await getWallPapers({
        q: query,
      });
      setData(data);
    };
    fetch();
  }, [query]);
  console.log(query);
  return (
    <>
      <Container>
        <Hero setQuery={setQuery} />
        <ResultContainer data={data} />
        <Footer />
        <ToggleThemeButton />
      </Container>
    </>
  );
}

export default App;

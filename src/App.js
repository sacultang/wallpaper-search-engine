import styled from "styled-components";
import ToggleThemeButton from "./component/ToggleThemeButton";
import Hero from "./component/Hero";
import ResultContainer from "./component/ResultContainer";
import Footer from "./component/Footer";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import getWallPapers from "./api/getWallpaers";
import EmptyResult from "./component/EmptyResult";
const Container = styled.div`
  position: relative;
  background-color: var(--primary);
  min-height: 100vh;
`;

function App() {
  const [data, setData] = useState({ total: 0, totalHits: 0, hits: [] });
  const [query, setQuery] = useState("");
  const [orientation, setOrientation] = useState("popular");
  const [order, setOrder] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const numOfPages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;
  const target = useRef(null);
  useEffect(() => {
    const fetch = async () => {
      const data = await getWallPapers({
        q: query,
        orientation,
        order,
        page,
        per_page: perPage,
      });
      if (page === 1) {
        setData(data);
      } else {
        setData((prevData) => ({
          ...prevData,
          hits: [...prevData.hits, ...data.hits],
        }));
      }
    };
    fetch();
  }, [query, orientation, order, page, perPage]);
  // console.log(query);
  const callback = ([entries], observer) => {
    if (entries.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 1,
    });
    observer.observe(target.current);
  }, []);
  useEffect(() => {
    setPage(1);
  }, [query, orientation, order, perPage]);

  // 1. 검색 결과 없을때 - 로딩중을 보여 주면 x, 검색 결과가 없습니다 o
  // 2. 모두 다 검색 되어서 결과가 없을때 -로딩중x, 검색결과 없습니다 x
  return (
    <>
      <Container>
        <Hero
          setQuery={setQuery}
          setOrientation={setOrientation}
          setOrder={setOrder}
          setPerPage={setPerPage}
        />
        <ResultContainer
          data={data}
          page={page}
          setPage={setPage}
          numOfPages={numOfPages}
        />
        {numOfPages !== page && (
          <div ref={target}>
            <EmptyResult isLoading={data.totalHits} />
          </div>
        )}

        <Footer />
        <ToggleThemeButton />
      </Container>
    </>
  );
}

export default App;

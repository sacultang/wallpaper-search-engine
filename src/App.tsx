import styled from "styled-components";
import ToggleThemeButton from "./component/ToggleThemeButton";
import ResultContainer from "./component/Image/ImageContainer";
import Footer from "./component/Footer";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import getWallPapers from "./api/getWallpaers";
import EmptyResult from "./component/EmptyResult";
import Title from "./component/Title";
import Search from "./component/search/Search";
import { IGetWallPapersResponse, Order, Orientation } from "./types";
const Container = styled.div`
  position: relative;
  background-color: var(--primary);
  min-height: 100vh;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 120px 32px 16px 32px;
  background-color: var(--secondary);
`;

function App() {
  const [data, setData] = useState<IGetWallPapersResponse>({
    total: 0,
    totalHits: 0,
    hits: [],
  });
  const [query, setQuery] = useState("");
  const [orientation, setOrientation] = useState<Orientation>("all");
  const [order, setOrder] = useState<Order>("popular");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const numOfPages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;
  const target = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getWallPapers({
        q: query,
        orientation: orientation,
        order: order,
        page: page.toString(),
        per_page: perPage.toString(),
      });
      if (page === 1) {
        console.log(data);
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
  const callback: IntersectionObserverCallback = ([entries]) => {
    if (entries.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    if (!target.current) return;
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
        <Header>
          <Title />
          <Search
            setQuery={setQuery}
            setOrientation={setOrientation}
            setOrder={setOrder}
            setPerPage={setPerPage}
          />
        </Header>
        <ResultContainer data={data} />
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

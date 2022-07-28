import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../asset/search.svg";
import SearchTag from "./SearchTag";
import SearchOption from "./SearchOption";
import { debounce } from "../../utils/debounce";
import { Order, Orientation } from "../../types";
const SearchTagContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  justify-content: center;
`;

const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  padding: 4px 16px;
  width: 100%;
  align-items: center;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const SearchInput = styled.input`
  background: transparent;
  font-size: 16px;
  outline: none;
  color: #5e5e5e;
  border: none;
  flex: auto;
  margin-left: 8px;
`;

const SearchOptionButton = styled.p`
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  color: #5e5e5e;
`;

interface ISearch {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setOrientation: React.Dispatch<React.SetStateAction<Orientation>>;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Search = ({
  setQuery,
  setOrientation,
  setOrder,
  setPerPage,
}: ISearch) => {
  const savedSearchTags = localStorage.getItem("searchTags");
  const initialSearchTags = savedSearchTags ? JSON.parse(savedSearchTags) : [];
  const [searchOption, setSearchOption] = useState(true);
  const [searchTags, setSearchTags] = useState(initialSearchTags);
  const inputRef = useRef<HTMLInputElement>(null!);

  const updateSearchInput = (value: string) => {
    inputRef.current.value = value;
  };
  const toggleSearchOption = () => {
    setSearchOption((prev) => !prev);
  };
  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
      setSearchTags((prev: string) => [...prev, e.target.value]);
      updateSearchInput("");
    }
  };
  const searchTag = (tag: string) => {
    setQuery(tag);
    updateSearchInput(tag);
    // 1. 현재 클릭 된  최근 검색어로 검색 실행
    // 2. 검색 창 input 값
  };
  const deleteTag = (idx: number) => {
    const newSearchTags = [...searchTags];
    newSearchTags.splice(idx, 1);
    setSearchTags(newSearchTags);
  };
  useEffect(() => {
    localStorage.setItem("searchTags", JSON.stringify(searchTags));
  }, [searchTags]);
  return (
    <>
      <SearchBoxContainer>
        <SearchInputContainer>
          <SearchIcon width="24" fill="#5e5e5e" />
          <SearchInput
            ref={inputRef}
            onKeyDown={onSearch}
            placeholder="검색어 입력 후 ENTER"
            onChange={(e) =>
              debounce(() => console.log(e.target.value), 200, e)
            }
          />
          <SearchOptionButton onClick={toggleSearchOption}>
            검색 옵션 {searchOption ? "열기" : "닫기"}
          </SearchOptionButton>
        </SearchInputContainer>
        <div hidden={searchOption}>
          <SearchOption
            setOrder={setOrder}
            setOrientation={setOrientation}
            setPerPage={setPerPage}
          />
        </div>
      </SearchBoxContainer>
      <SearchTagContainer>
        {searchTags.map((tag: string, idx: number) => (
          <SearchTag
            key={tag + idx}
            tag={tag}
            searchTag={() => searchTag(tag)}
            deleteTag={() => {
              deleteTag(idx);
            }}
          />
        ))}
      </SearchTagContainer>
    </>
  );
};

export default Search;

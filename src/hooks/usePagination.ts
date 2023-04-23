import { useState } from "react";

// limit : 한 페이지의 크기
export const usePagination = <T>(list: T[], limit: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(list.length / limit);
  const offset = limit * (currentPage - 1);

  const moveFirstPage = () => setCurrentPage(1);

  const movePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const moveNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((page) => page + 1);
    }
  };

  const moveLastPage = () => setCurrentPage(totalPage);

  // currentPage에 해당하는 list 반환
  const getCurrentList = () => list.slice(offset, offset + limit);

  return {
    currentPage,
    totalPage,
    offset,
    setCurrentPage,
    moveFirstPage,
    movePrevPage,
    moveNextPage,
    moveLastPage,
    getCurrentList,
  };
};

import React from "react";
import { Pagination as AntdPagination } from "antd";
import { Country } from "@/shared/model/common";

interface PageInfo {
  prevPage: number;
  currentPage: number;
  nextPage: number;
}

interface PaginationProps {
  totalPages: number;
  currPages: PageInfo;
  setCurrPages: React.Dispatch<React.SetStateAction<PageInfo>>;
  currentCountries: Country[] | undefined;
  countryList?: Country[];
}

const Pagination = ({
  totalPages,
  currPages,
  setCurrPages,
  currentCountries,
  countryList,
}: PaginationProps) => {
  console.log(countryList?.length, "test");

  const { prevPage, currentPage, nextPage } = currPages;

  const onPageChange = (page: number, pageSize: number) => {
    setCurrPages((prevState) => ({
      ...prevState,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
    }));
  };

  return (
    <AntdPagination
      total={countryList?.length}
      current={currPages.currentPage}
      onChange={onPageChange}
      showSizeChanger={false}
    />
  );
};

export default Pagination;

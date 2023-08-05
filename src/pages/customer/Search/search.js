import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.css";
import CardList from "../../../components/CardList/CardList";
import Card from "../../../components/Card/Card";
// import data from "../../../json/search.json";
import LayoutPrimary from "layouts/LayoutPrimary";
import SearchField from "components/Search-bar/SearchField";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Button from "components/Button/Button";
const cx = classNames.bind(styles);
function Search({ handleLike }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const { startDate, endDate, name } = location.state.item;
  console.log(location);
  async function fetchData(page) {
    const response = await axios.get(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_HOTEL}/hotels?page=${page}&limit=4&location=${name}&check_in=${startDate}&check_out=${endDate}&name=${location.state.hotelName}`
    );
    setTotal(response.data.total_count);
    if (data.length > 0) {
      setData(response.data.items);
    }
    return response.data.items ? response.data.items : [];
  }
  const handleLoadMore = () => {
    fetchData(pageNumber).then((hotel) => {
      const newHotel = [...data, ...hotel];
      setData(newHotel);
      setPageNumber(pageNumber + 1);
    });
  };
  useEffect(() => {
    handleLoadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutPrimary>
      <div className={cx("search-wrapper")}>
        <div className={cx("colleft")}>
          <div className={cx("container")}>
            <div className={cx("search-result")}>
              {total ? total : 0} result found
            </div>
            <SearchField
              setTotal={setTotal}
              data={data}
              setData={setData}
              setPageNumber={setPageNumber}
            ></SearchField>
          </div>
          <CardList>
            {data?.length > 0 ? (
              data.map((x) => (
                <Card
                  key={x.id}
                  id={x.id}
                  name={x.name}
                  starLevel={x.star_level}
                  address={x.address ? x.address.province : "not yet"}
                  thumbnail={x.list_image[0].url}
                  handleLike={handleLike}
                ></Card>
              ))
            ) : (
              <div></div>
            )}
          </CardList>

          {4 * pageNumber - 4 < total && (
            <Button
              green
              medium
              onClick={() => {
                handleLoadMore();
              }}
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Search;

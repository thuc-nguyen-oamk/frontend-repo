import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/_Common.module.css";
import cx from "classnames";
import jwt from "jsonwebtoken";
import { BsPlusLg } from "react-icons/bs";

export default function ManagerCategories() {
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
    const token = window.localStorage.getItem("appAuthData");

    axios
      .get(`${API_ADDRESS}/categories/myCategories`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  function getIsManager() {
    const token = window.localStorage.getItem("appAuthData");
    if (!token) console.error("No app auth data");
    return jwt.decode(token).account_type == 2;
  }

  return (
    <div>
      {getIsManager() && (
        <div
          className={styles.floatingBigPlus}
          title="Add a New Category"
          onClick={() => (window.location.href = "/managers/categories/create")}
        >
          <BsPlusLg size="3em" />
        </div>
      )}

      {data.length > 0 && (
        <div>
          <div className={cx(styles.flex, styles.marginTop1)}>
            <div>
              <b>Search for categories: &nbsp;</b>
            </div>
            <input
              className={cx(styles.formcontrol, styles.width300)}
              type="search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          <table className={cx(styles.marginTop2)}>
            <thead>
              <tr>
                <th className={cx(styles.center, styles.uppercase, styles.fontSize15, styles.pb1)}>Category</th>
                <th className={cx(styles.center, styles.uppercase, styles.fontSize15, styles.pb1)}>Belongs to the restaurant</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((d) => d.category_name.toLowerCase().includes(searchString.toLowerCase()))
                .map((d, index) => (
                  <tr key={index}>
                    <td>
                      {/* cannot use classNames={styles.textDecorNone} */}
                      <a href={`/managers/categories/modify/${d.idcategories}`} style={{ textDecoration: "none" }}>
                        {/* <a href={`/managers/categories/modify/${d.idcategories}`} style={{ textDecoration: "none" }}> */}
                        <div className={styles.formwrapper}>
                          <input
                            disabled
                            type="text"
                            value={d.category_name}
                            className={cx(styles.formcontrol, styles.cursorPointer, styles.onHoverColor1)}
                          />
                        </div>
                      </a>
                    </td>
                    <td>
                      {/* cannot use classNames={styles.textDecorNone} */}
                      <a href={`/managers/restaurants/${d.restaurants_idrestaurants}`} style={{ textDecoration: "none" }}>
                        <div className={styles.formwrapper}>
                          <input
                            disabled
                            type="text"
                            value={d.restaurant_name}
                            className={cx(styles.formcontrol, styles.cursorPointer, styles.onHoverColor1)}
                          />
                        </div>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {data.length <= 0 && <div className={cx(styles.marginTop2, styles.marginLeft1)}>(You have no categories!)</div>}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.scss";

export default function PageNotFound() {
  return (
    <div style={{ height: "100vh" }}>
      <div className="page-not-found container">
        <img src="./images/404-not-found.jpg" alt="" />
        <button className="btn btn-primary">
          <Link to="/">Quay Về Trang Chủ</Link>
        </button>
      </div>
    </div>
  );
}

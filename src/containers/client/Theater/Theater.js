import React, { useEffect } from "react";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actFetchTheaterAction } from "store/action/theaterAction";
import "./Theater.scss";

export default function Theater() {
    const dispatch = useDispatch();

    const { loading, theater } = useSelector((state) => state.theaterReducer);

    useEffect(() => {
        dispatch(actFetchTheaterAction());
    }, []);

    if (loading)
        return <Loader type="Bars" color="#ecd60f" height={80} width={80} style={{display:"flex",justifyContent:"center",height:'100vh',alignItems: "center"}}/>

    return (
        theater && (
            <section className="theater">
                <div
                    className="nav nav-tabs container"
                    id="nav-tab"
                    role="tablist"
                >
                    {theater.map((heThongRap, idx) => {
                        return (
                            <button
                                className={`nav-link ${idx === 0 && "active"}`}
                                id="nav-home-tab"
                                data-bs-toggle="tab"
                                href={`#${heThongRap.maHeThongRap}`}
                                type="button"
                                role="tab"
                                aria-controls="nav-home"
                                aria-selected="true"
                            >
                                <img
                                    src={heThongRap.logo}
                                    width="40px"
                                    className="mr-2"
                                />
                                <p width="40px">{heThongRap.tenHeThongRap}</p>
                            </button>
                        );
                    })}
                </div>
                <div
                    className="tab-content container-fluid"
                    id="nav-tabContent"
                >
                    {theater.map((heThongRap, idx) => {
                        return (
                            <div
                                className={`tab-pane fade show ${idx === 0 && "active"
                                    }`}
                                id={heThongRap.maHeThongRap}
                                role="tabpanel"
                                aria-labelledby="nav-home-tab"
                            >
                                <div className="d-flex align-items-start">
                                    <div className="col-3">
                                        <div
                                            className="nav flex-column nav-pills me-3"
                                            id="v-pills-tab"
                                            role="tablist"
                                            aria-orientation="vertical"
                                        >
                                            {heThongRap.lstCumRap.map(
                                                (rap, idx) => {
                                                    return (
                                                        <button
                                                            class={`nav-link ${idx === 0 &&
                                                                "active"
                                                                }`}
                                                            id="v-pills-home-tab"
                                                            data-bs-toggle="pill"
                                                            href={`#${rap.maCumRap}`}
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="v-pills-home"
                                                            aria-selected="true"
                                                        >
                                                            <img
                                                                src={
                                                                    rap.hinhAnh
                                                                }
                                                                width="40px"
                                                                className="mr-2"
                                                            />
                                                            {rap.tenCumRap}
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-9">
                                        <div
                                            className="tab-content"
                                            id="v-pills-tabContent"
                                        >
                                            {heThongRap.lstCumRap.map(
                                                (rap, idx) => {
                                                    return (
                                                        <div
                                                            className={`tab-pane fade show ${idx === 0 &&
                                                                "active"
                                                                }`}
                                                            id={rap.maCumRap}
                                                            role="tabpanel"
                                                            aria-labelledby="v-pills-home-tab"
                                                        >
                                                            {rap.danhSachPhim.map(
                                                                (phim) => {
                                                                    return (
                                                                        <div className="row time">
                                                                            <div className="col-2">
                                                                                <img
                                                                                    src={
                                                                                        phim.hinhAnh
                                                                                    }
                                                                                    width="90px"
                                                                                    className="mr-2"
                                                                                />
                                                                                <p>{phim.tenPhim}</p>
                                                                            </div>
                                                                            <div className="col-10">
                                                                                {phim.lstLichChieuTheoPhim.map(
                                                                                    (
                                                                                        lichChieu
                                                                                    ) => {
                                                                                        return (
                                                                                            <Link
                                                                                                to={`/seat-plan/${lichChieu.maLichChieu}`}
                                                                                                className="btn btn-warning mr-3 mb-3"
                                                                                            >
                                                                                                {new Date(
                                                                                                    lichChieu.ngayChieuGioChieu
                                                                                                ).toLocaleTimeString()}
                                                                                            </Link>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </div>
                                                                            <hr />
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        )
    );
}
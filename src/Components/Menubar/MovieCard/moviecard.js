import React, { useState, useEffect } from "react";
import NoImage from "../../../Assets/no-image-found.png";
import {
  HeartOutlined,
  HeartFilled,
  FieldTimeOutlined,
} from "@ant-design/icons";
import "./moviecard.scss";

export default function Moviecard({ movies }) {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    var local = await localStorage.getItem("favouriteMovie");
    if (local == null) {
      setEntry([]);
      setLoading(false);
    } else {
      setEntry(JSON.parse(local));
      setLoading(false);
    }
  }, []);

  const saveToFavourites = (movie) => {
    var entryState = [...entry];
    entryState.push(movie);
    setEntry(entryState);
    localStorage.setItem("favouriteMovie", JSON.stringify(entryState));
  };
  const removeFromFavourites = (movie) => {
    var entryState = [...entry];
    var index = entryState.findIndex((a) => a.id == movie.id);
    entryState.splice(index, 1);
    setEntry(entryState);
    localStorage.setItem("favouriteMovie", JSON.stringify(entryState));
  };
  const detectIfSaved = (movie) => {
    if (!loading) {
      if (entry.findIndex((a) => a.id == movie.id) != -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <>
      {movies.map((movie) => {
        return (
          <div className="card">
            <img
              className="img"
              src={movie.show.image != null ? movie.show.image.medium : NoImage}
            ></img>
            <div className="card-top-info">
              <h3>{movie.name}</h3>
              <div className="time">
                <FieldTimeOutlined
                  style={{ fontSize: "18px", color: "#00ACC1" }}
                />
                <h5>{movie.airtime}</h5>
              </div>
            </div>
            <div className="card-bottom-info">
              <p>{`Season ${movie.season} - Episode ${movie.number}`}</p>
              {!detectIfSaved(movie) ? (
                <HeartOutlined
                  style={{
                    fontSize: "18px",
                    color: "#b20000",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    saveToFavourites(movie);
                  }}
                />
              ) : (
                <HeartFilled
                  onClick={() => {
                    removeFromFavourites(movie);
                  }}
                  style={{
                    fontSize: "18px",
                    color: "#b20000",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

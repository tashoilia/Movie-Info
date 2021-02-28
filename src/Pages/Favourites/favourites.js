import React, { useState, useEffect } from "react";
import Menubar from '../../Menubar/menubar'
import './favourites.scss'
import NoImage from "../../Assets/no-image-found.png";
import {
    DeleteOutlined,
  FieldTimeOutlined
} from "@ant-design/icons";
import { message,Popover,Tooltip } from 'antd';
import removeTags from "../../helpers/removeTags"
import longString from "../../helpers/longString";


export default function Favourites({history}) {

    const [entry, setEntry] = useState([]);
    // const [loading, setLoading] = useState(true);
  
    const removeMessage = () => {
      message.error('Movie removed from favourites');
    };
  
    useEffect(async () => {
      var local = await localStorage.getItem("favouriteMovie");
      if (local == null) {
        setEntry([]);
        // setLoading(false);
      } else {
        setEntry(JSON.parse(local));
        // setLoading(false);
      }
    }, []);
  
    // const saveToFavourites = (movie) => {
    //   var entryState = [...entry];
    //   entryState.push(movie);
    //   setEntry(entryState);
    //   localStorage.setItem("favouriteMovie", JSON.stringify(entryState));
    // };
    const removeFromFavourites = (movie) => {
      var entryState = [...entry];
      var index = entryState.findIndex((a) => a.id == movie.id);
      entryState.splice(index, 1);
      setEntry(entryState);
      localStorage.setItem("favouriteMovie", JSON.stringify(entryState));
    };
    // const detectIfSaved = (movie) => {
    //   if (!loading) {
    //     if (entry.findIndex((a) => a.id == movie.id) != -1) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // };

    return (
        <div className="favourites-wrapper"> 
            <Menubar history={history}/>
            <h1>Wishlist</h1>
            <div className="cards-wrapper">
            {entry.map((movie) => {
        return (
          <div className="card">
              <Popover content={<div>
      <p>{movie.summary == null ? "No summary yet" : removeTags(movie.summary)}</p>
    </div>} title={movie.name} trigger="hover" placement="rightBottom" mouseEnterDelay={0.3}>
                   <img
              className="img"
              src={movie.show.image != null ? movie.show.image.medium : NoImage}
            ></img>
              </Popover>
           
            <div className="card-top-info">
              <h3>{ longString(movie.name)}</h3>
              <div className="time">
                <FieldTimeOutlined
                  style={{ fontSize: "18px", color: "#00ACC1" }}
                />
                <h5>{movie.airtime}</h5>
              </div>
            </div>
            <div className="card-bottom-info">
              <p>{`Season ${movie.season} - Episode ${movie.number}`}</p>
              {/* {!detectIfSaved(movie) ? (
                  <Tooltip title="Add to favourites">
                      <HeartOutlined
                  style={{
                    fontSize: "18px",
                    color: "#F5C518",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    saveToFavourites(movie);
                    
                  }}
                />
                  </Tooltip> */}
              {/* ) : ( */}
                <Tooltip title="Remove from favourites">
                <DeleteOutlined
                  onClick={() => {
                    removeFromFavourites(movie);
                    removeMessage()
                  }}
                  style={{
                    fontSize: "18px",
                    color: "red",
                    cursor: "pointer",
                  }}
                />
                </Tooltip>
              {/* )} */}
            </div>
          </div>
        );
      })}
            </div>
        </div>
    )
}

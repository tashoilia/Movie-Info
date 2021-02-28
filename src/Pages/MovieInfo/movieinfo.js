import React, {useState, useEffect} from 'react'
import "./movieinfo.scss"
import { FaTheaterMasks } from 'react-icons/fa';
import { Rate, Button } from 'antd';
import axios from "axios"
import removeTags from '../../helpers/removeTags';
import NoImage from "../../Assets/no-image-found.png"

export default function Movieinfo({history,match}) {
    const [movie,setMovie] = useState([])
    const [loading,setLoading] = useState(true)

    let id = match.params.id
    useEffect(() => {
    axios.get(`http://api.tvmaze.com/shows/${id}`)
        .then(function (response) {
            setMovie(response.data)
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error);
        })

    },[])

    return (
        <div className="movie-info-wrapper">
            {loading ? <div>loading</div> : 
                <>
                <div className="movie-left-side">
                <div className="movie-title">
                    <h1>{movie.name}</h1>
                    <div></div>
                </div>
                <div className="genre-rating-section">
                    <div>
                        <FaTheaterMasks style={{color:"00ACC1", fontSize:"24px"}}/>
                        <p>{movie.genres && movie.genres.length == 0 ? <div>No genre</div> : movie.genres.join(' ')}</p>
                    </div>
                    <div>
                        <p>{movie.rating.average == null ? <div>No rate yet</div> : movie.rating.average}</p>
                        <Rate defaultValue={movie.rating.average == null ? 0 : movie.rating.average }  count={10} allowHalf disabled/>
                    </div>
                </div>
                <p className="description">{removeTags(movie.summary)}</p>
                <div className="other-info">
                    <div className="schedule">
                        <h3>Schedule</h3>
                        <ul>
                            {
                                movie.schedule.days.map(day => {
                                   return <li>{day}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="language">
                        <h3>{movie.language}</h3>
                        <h5>English</h5>
                    </div>
                    <div className="movie-url">
                        <h3>Movie Url</h3>
                        <a href={movie.url}>{movie.url}</a>
                    </div>
                </div>
            </div>
            <div className="movie-right-side">
                <div className="overlay"></div>
                <img src={movie.image != null ? movie.image.original : NoImage}></img>
            </div>
            <Button type="primary" onClick={() => {
            history.push("/")}}>Go</Button>
                </>
            }
            
        </div>
    )
}

import React, {useEffect,useState} from 'react'
import './home.scss'
import Menubar from '../../Menubar/menubar'
import { InfoCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import Moviecard from '../../Components/MovieCard/moviecard'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import movie_loader from "../../Assets/movie_loader.json"


export default function Home({history}) {
    const [movies,setMovies] = useState([])
    const [loading,setLoading] = useState(true)
    
    useEffect(() => {
    axios.get('http://api.tvmaze.com/schedule?country=US')
        .then(function (response) {
            setMovies(response.data)
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error);
        })

    },[])
    
    return (
        <div className='home-wrapper'>
            <Menubar history={history}/>
            <div className='sub-header'>
            <InfoCircleOutlined style={{fontSize: "15px", marginRight:"10px"}}/>
                Today movies only for you
            </div>
            { loading ? <Player
                autoplay
                loop
                src={movie_loader}  
                style={{ height: '300px', width: '300px' }}
                >
                </Player> :  <div className='cards-wrapper'><Moviecard movies={movies} history={history} /></div> }
                </div> 
            
    )
}

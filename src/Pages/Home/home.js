import React, {useEffect,useState} from 'react'
import './home.scss'
import Menubar from '../../Components/Menubar/menubar'
import { InfoCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import Moviecard from '../../Components/Menubar/MovieCard/moviecard'

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
            <InfoCircleOutlined />
                Today movies only for you
            </div>
            <div className='cards-wrapper'>
                { loading ? <h1>Loading</h1> :  <Moviecard movies={movies}/> }
                </div> 
            </div>
    )
}

import React, {useState, useEffect} from 'react'
import NoImage from '../../../Assets/no-image-found.png'
import { HeartOutlined, HeartFilled, FieldTimeOutlined } from '@ant-design/icons'
import './moviecard.scss'

export default function Moviecard({movies}) {
    
    const [entry,setEntry] = useState(null)   
    
    useEffect(async () => {
        var local = await localStorage.getItem("favouriteMovie") ? await localStorage.getItem("favouriteMovie") : []
        if(local == null) {
            setEntry([])
        } else {
            setEntry(JSON.parse(local))
        }
    },[])
    
    const saveToFavourites = (movie) => {  
        var entryState = [...entry]
        entryState.push(movie)
        setEntry(entryState)
        localStorage.setItem('favouriteMovie', JSON.stringify(entryState));  
    }

    return (
        <>
        {movies.map(movie => {
            return <div className='card'>
            <img className='img' src={movie.show.image != null ? movie.show.image.medium : NoImage }></img>
            <div className='card-top-info'>
                <h3>{movie.name}</h3>
                <div className='time'>
                    <FieldTimeOutlined style={{fontSize:'18px', color:'#00ACC1'}} />
                    <h5>{movie.airtime}</h5>
                </div>
            </div>
            <div className='card-bottom-info'>
                <p>{`Season ${movie.season} - Episode ${movie.number}`}</p>
                {
                    entry.indexOf(movie) == -1 || entry == null ? <HeartOutlined  style={{fontSize:'18px', color:'#b20000', cursor:'pointer'}} onClick={() => {saveToFavourites(movie)}} /> : <HeartFilled style={{fontSize:'18px', color:'#b20000', cursor:'pointer'}}/>
                }
                
            </div>
        </div>
        })}
        
        </>
    )
}

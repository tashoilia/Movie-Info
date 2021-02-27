import React from 'react'
import Menubar from '../../Components/Menubar/menubar'
import './favourites.scss'


export default function Favourites({history}) {
    return (
        <div className="favourites-wrapper"> 
            <Menubar history={history}/>
            <div className="cards-wrapper">Here are favourite movies</div>
        </div>
    )
}

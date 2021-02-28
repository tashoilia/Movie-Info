import React from 'react'
import './menubar.scss'

export default function Menubar({history}) {
    return (
        <div className="menu-wrapper">
            <h2 onClick={() => {
            history.push("/")}}>Movie title</h2>
            <h4 onClick={() => {
            history.push("/favourites")}}>Wishlist</h4>
        </div>
    )
}

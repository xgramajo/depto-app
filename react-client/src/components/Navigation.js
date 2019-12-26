import React from "react";
import { NavLink } from 'react-router-dom';

const Navigation = () => {

    return (
        <nav>
        <ul>
          <li><NavLink to='/'>Inicio</NavLink></li>
          <li><NavLink to='/news'>Noticias</NavLink></li>
          <li><NavLink to='/news/create-news'>Crear Noticia</NavLink></li>
        </ul>
      </nav>
    )
};

export default Navigation
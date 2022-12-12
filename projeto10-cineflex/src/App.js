import { Cineflex } from "./styled"
import { SelectMovie } from "./styled"
import axios from 'axios';
import { useState } from "react";
import { MoviesImg } from "./styled";
import { useEffect } from "react";



export default function App() {
    const [releaseDate, setreleaseDate] = useState('a')
    const [posterURL, setposterURL] = useState('b')
    const [title, settitle] = useState('b')
    const [id, setid] = useState('b')
    const [overview, setoverview] = useState('b')
    const [ApiThings,setApiThings] = useState([]);

    useEffect(() => {getMovies()}, [])

    return (
        <div>
        <Cineflex>CINEFLEX</Cineflex>
        <SelectMovie>Selecione o filme</SelectMovie>
        <div onClick={getMovies}>
            {ApiThings.map(()  => <img key={title} style={{width: 130, height: 195}} src={posterURL} alt={releaseDate}/>)}
            
        </div>
        </div>
    )


function getMovies() {
    const promise =  axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
     .then((response) => {
        let i = 0;
         while( i < response.data.length) {
         setid(response.data[i].id)
         settitle(response.data[i].title)
         setposterURL(response.data[i].posterURL)
         setoverview(response.data[i].overview)
         setreleaseDate(response.data[i].releaseDate)
         setApiThings([response.data[i].id,response.data[i].title,response.data[i].posterURL,response.data[i].overview,response.data[i].releaseDate] )
         console.log(ApiThings)
         i++;
         }
     })
 }
}

//  id: 1,
//  title: "2067",
//  posterURL: "https://image.tmdb.org/t/p/w500/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg",
//  overview: "A lowly utility worker is called to the future by a mysterious radio signal, he must leave his dying wife to embark on a journey that will force him to face his deepest fears in an attempt to change the fabric of reality and save humankind from its greatest environmental crisis yet.",
//  releaseDate: "2020-10-01T00:00:00.000Z",
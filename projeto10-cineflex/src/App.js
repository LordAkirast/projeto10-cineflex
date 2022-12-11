import { Cineflex } from "./styled"
import { SelectMovie } from "./styled"
import axios from 'axios';
import { useState } from "react";
import { MoviesImg } from "./styled";



export default function App() {
    const [releaseDate, setreleaseDate] = useState('a')
    const [posterURL, setposterURL] = useState('b')

    return (
        <div>
        <Cineflex>CINEFLEX</Cineflex>
        <SelectMovie>Selecione o filme</SelectMovie>
        <div onClick={getMovies}>
            <img style={{width: 130, height: 195}} src={posterURL} alt={releaseDate}/>
            
        </div>
        </div>
    )


function getMovies() {
    const promise =  axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
     .then((response) => {
        console.log(response.data[0].posterURL)
         for(let i in response.data) {
         let id = response.data[i].id
         let title = response.data[i].title
         setposterURL(response.data[0].posterURL)
         let overview = response.data[i].overview
         setreleaseDate(response.data[i].releaseDate)
         }
     })
 }
}

//  id: 1,
//  title: "2067",
//  posterURL: "https://image.tmdb.org/t/p/w500/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg",
//  overview: "A lowly utility worker is called to the future by a mysterious radio signal, he must leave his dying wife to embark on a journey that will force him to face his deepest fears in an attempt to change the fabric of reality and save humankind from its greatest environmental crisis yet.",
//  releaseDate: "2020-10-01T00:00:00.000Z",
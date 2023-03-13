import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react"


export default function App() {
    const [moviesArray, setmoviesArray] = useState([])
    const [movieAndSession, setmovieAndSession] = useState('')
    const [date, setdate] = useState('')
    const [finalSeats, setfinalSeats] = useState('')
    const [buyerName, setbuyerName] = useState('')
    const [buyerCpf, setbuyerCpf] = useState('')

    useEffect(() => {
        const url = 'https://mock-api.driven.com.br/api/v8/cineflex/movies'
        const promise = axios.get(url)

        promise.then((res) => {
            // console.log(res.data)
            setmoviesArray(res.data)

        
        })

        promise.catch((err) => {
            console.log(err.data)
        })
    },[])


    return (
        <>
            <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>

                <Routes>
                    <Route path='/' element={<HomePage moviesArray={moviesArray}/>}/>
                    <Route path='/sessoes/:idFilme' element={<SessionsPage moviesArray={moviesArray} />}/>
                    <Route path='/assentos/:idSessao' element={<SeatsPage moviesArray={moviesArray} buyerCpf={buyerCpf} buyerName={buyerName} finalSeats={finalSeats} date={date} movieAndSession={setmovieAndSession}/>}/>
                    {/* <Route path='/sucesso' element={<SuccessPage buyerCpf={buyerCpf} buyerName={buyerName} finalSeats={finalSeats} moviesArray={moviesArray} date={date} movieAndSession={movieAndSession}/>}/> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}





const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`

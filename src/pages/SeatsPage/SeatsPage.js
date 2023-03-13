import styled from "styled-components"
import axios from 'axios'
import { BrowserRouter, Routes, Route, useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import SuccessPage from "../SuccessPage/SuccessPage"

export default function SeatsPage({ setmovieAndSession, date, finalSeats, buyerName, buyerCpf }) {

    const [selectedSeat, setselectedSeat] = useState([])
    const [selectArray, setselectArray] = useState([])
    const [movieName, setmovieName] = useState('')
    const [movieDate, setmovieDate] = useState('')
    const [movieURL, setmovieURL] = useState('')
    const [name, setname] = useState('')
    const [cpf, setcpf] = useState('')
    const [count, setcount] = useState(0)
    const navigate = useNavigate()
    const [seatNumber, setseatNumber] = useState([])
    const [color, setcolor] = useState('#1AAE9E')
    const [text, settext] = useState('Selecione o(s) assento(s)')

    const { idSessao } = useParams()


    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        const promise = axios.get(url)

        promise.then((res) => {
            setselectedSeat(res.data.seats)
            setmovieName(res.data.movie.title)
            setmovieDate(res.data.day.weekday + ' - ' + res.data.name)
            setmovieURL(res.data.movie.posterURL)
        })

        promise.catch((err) => {
            alert('Deu erro para pegar as sessões')
            console.log("ERRO" + err.data)
        })
    }, [selectArray])


    function Next() {
        const url = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many';

        axios.post(url,
            {
                ids: selectArray,
                name: name,
                cpf: cpf
            }
        )
            .then((response) => {
                console.log(response);
                setcount(1)
                window.history.pushState({}, "", "http://localhost:3000/sucesso");


            })
            .catch((error) => {
                console.error(error);
            });
    }

    


    return (
        count === 0 ?
            <PageContainer>
                {text}

                <SeatsContainer>

                    {selectedSeat.map((seats) => (
                        seats.isAvailable === true ? < SeatItem data-test="seat" key={seats.id} style={{
                            backgroundColor: selectArray.includes(seats.id) === true ? color : 'lightblue'
                          }}  onClick={() => {
                            if (selectArray.includes(seats.id)) {
                                alert('Assento já selecionado!');
                            } else {
                                setselectArray([...selectArray, seats.id]);
                                setseatNumber([...seatNumber, seats.name]);
                                settext('Clique no ícone de "Selecionados" para reinicializar a escolha de assentos')
                            }
                        }}
                            >{seats.name}</SeatItem> : <SeatItemNot data-test="seat" onClick={() => alert('Assento Indisponível')} key={seats.id}>{seats.name}</SeatItemNot>

                    ))}

                </SeatsContainer>

                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircledis onClick={resetSeats} />
                        Selecionados:
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle />
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCirclein />
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <FormContainer>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        Next();
                    }}>
                        Nome do Comprador:
                        <input data-test="client-name" value={name} onChange={e => setname(e.target.value)} placeholder="Digite seu nome..." />

                        CPF do Comprador:
                        <input data-test="client-cpf" value={cpf} onChange={e => setcpf(e.target.value)} placeholder="Digite seu CPF..." />

                        <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
                    </form>
                </FormContainer>

                <FooterContainer data-test="footer">
                    <div>
                        <img src={movieURL} alt="poster" />
                    </div>
                    <div>
                        <p>{movieDate}</p>
                        <p>{movieName}</p>
                    </div>
                </FooterContainer>

            </PageContainer> : <SuccessPage seatNumber={seatNumber} name={name} cpf={cpf} movieName={movieName} movieDate={movieDate} movieURL={movieURL} />
    )

    function resetSeats() {
        setselectArray([])
        setseatNumber([])
        settext('Selecione o(s) assento(s)')
    }
}




const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`

const CaptionCirclein = styled.div`
    border: 1px solid #F7C52B;         // Essa cor deve mudar
    background-color: #FBE192;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`

const CaptionCircledis = styled.div`
    border: 1px solid #0E7D71;
    background-color: #1AAE9E;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;

    &:hover {
        background-color: #f44336;
        cursor: pointer;
    }
`;

const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${(props) => (props.available === true ? 'blue' : '#0E7D71')};         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    
`


const SeatItemSel = styled.div`
    border: 1px solid #0E7D71;         // Essa cor deve mudar
    background-color: #1AAE9E;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    
`
const SeatItemNot = styled.div`
    border: 1px solid #F7C52B;         // Essa cor deve mudar
    background-color: #FBE192;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`


const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`
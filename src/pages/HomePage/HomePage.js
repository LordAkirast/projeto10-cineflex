import styled from "styled-components"

export default function HomePage({ moviesArray }) {
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {moviesArray.map((movie) => (
                    <MovieContainer>
                        <img src={movie.posterURL} alt="poster" />
                        <movieTitle className="movieTitle">{movie.title}</movieTitle>
                    </MovieContainer>
                ))}
            </ListContainer>

        </PageContainer>
    )
}



const movieTitle = styled.div`
position: absolute; 
bottom: 0; left: 0; right: 0; 
background-color: rgba(0, 0, 0, 0.5); 
color: white; 
padding: 10px; 
font-size: 1.2rem; 
opacity: 0; 
transition: opacity 0.3s ease-in-out;;
`


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    &:hover ${movieTitle} { opacity: 1; };
    img {
        width: 130px;
        height: 190px;
    }
`
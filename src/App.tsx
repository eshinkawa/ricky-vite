import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function CharactersList({ personagens, adicionarFavoritos }) {
  //object destructuring 

  return (
    <>
      {personagens.map(character => (
        <div key={character.id} style={{marginBottom: 24, border: '1px solid #ccc', padding: 24, borderRadius: 8}}>
          <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
          <button onClick={() => adicionarFavoritos(character)}>Adicionar aos favoritos</button>
        </div>
      ))}
    </>
  )
}

function FavoritesList({ favoritos }) {
  return (
    <>
    <h1>TELA DE FAVORITOS</h1>
      {favoritos.map(character => (
        <div key={character.id}>
          <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
          <p>{character.status}</p>
          <p>{character.species}</p>
        </div>
      ))}
    </>
  )
}

function App() {
  
  // primeiro passo: chamar a API de personangens do Rick and Morty
  // JSON javascript object notation

  // segundo passo: criar um estado para armazenar os personagens

  // terceiro passo: criar rotas para os personagens favoritos

  const [characters, setCharacters] = useState([])
  const [favorites, setFavorites] = useState([])

  //react hooks https://react.dev/reference/react/hooks

  useEffect(() => {
   fetch(`https://rickandmortyapi.com/api/character?page`)
    .then(response => response.json())
    .then(data => setCharacters(data.results)) 
  }, [])

  const adicionarFavoritos = (character) => {

  const arrayFiltrado = favorites.filter(favorite => favorite.id === character.id)

    if(arrayFiltrado.length > 0) return alert('Esse personagem já está nos favoritos')

    setFavorites([...favorites, character]) 
    alert('Personagem adicionado aos favoritos')
  }

  return (
        <Router>
          <nav>
            <Link to="/">Início</Link>
            <Link to="/favorites"> Favoritos</Link>
          </nav>
          <Routes>
            <Route path="/" element={<CharactersList personagens={characters} adicionarFavoritos={adicionarFavoritos} />} />
            <Route path="/favorites" element={<FavoritesList favoritos={favorites} />} />
          </Routes>
        </Router>
  )
}

export default App

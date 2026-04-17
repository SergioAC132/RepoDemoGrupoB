import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PokemonSearch from './PokemonSearch.jsx'
import PokemonList from './PokemonList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PokemonList />
  </StrictMode>,
)

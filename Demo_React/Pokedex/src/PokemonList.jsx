import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const fetchPokemons = async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );

      const data = await res.json();

      // Aquí obtenemos detalles de cada Pokémon
      const detailedPokemons = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );

      setPokemons(detailedPokemons);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  return (
    <div className="list-container">
      <h2>Pokédex</h2>

      <div className="grid">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setOffset(offset - limit)}
          disabled={offset === 0}
        >
          Anterior
        </button>

        <button onClick={() => setOffset(offset + limit)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonSearch.css";

const PokemonSearch = () => {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    if (!name) return;

    try {
      setLoading(true);
      setError("");
      setPokemon(null);

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );

      if (!res.ok) throw new Error("Pokémon no encontrado");

      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPokemon();
  };

  return (
    <div className="search-container">
      <h2>Pokédex</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ej: pikachu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}

      {/* Aquí pasas el objeto */}
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
};

export default PokemonSearch;
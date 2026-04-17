import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  if (!pokemon) return null;

  const image =
    pokemon.sprites.other["official-artwork"].front_default;

  return (
    <div className="card">
      {/* HEADER */}
      <div className="card-header">
        <span className="name">{pokemon.name}</span>
        <span className="hp">HP {pokemon.stats[0].base_stat}</span>
      </div>

      {/* IMAGE */}
      <div className="image-container">
        <img src={image} alt={pokemon.name} />
      </div>

      {/* TYPES */}
      <div className="types">
        {pokemon.types.map((t) => (
          <span key={t.type.name} className={`type ${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>

      {/* ATTACKS */}
      <div className="attacks">
        {pokemon.abilities.slice(0, 2).map((a, i) => (
          <div key={i} className="attack">
            <span className="attack-name">
              {a.ability.name}
            </span>
            <span className="attack-damage">
              {Math.floor(Math.random() * 200)}
            </span>
          </div>
        ))}
      </div>

      {/* STATS */}
      <div className="stats">
        {pokemon.stats.slice(0, 3).map((s) => (
          <div key={s.stat.name}>
            {s.stat.name}: {s.base_stat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
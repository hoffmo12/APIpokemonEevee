import React, { useEffect, useState } from 'react';
import './index.css';

function PokemonData() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('eevee'); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    
    if (!pokemonName.trim()) {
      setPokemon(null);
      return;
    }

    const fetchPokemonData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        
        if (!response.ok) {
          setPokemon(null); 
        } else {
          const data = await response.json();
          setPokemon(data);
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do Pokémon:', error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  const handleInputChange = (event) => {
    setPokemonName(event.target.value);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Digite o nome do Pokémon desejado!!"
        value={pokemonName}
        onChange={handleInputChange}
      />
      
      {loading && <div>Carregando...</div>}
      
      {pokemon ? (
        <div className="pokemon-card">
          <h1 className="pokemon-name">{pokemon.name}</h1>
          <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />

          <h2>---Habilidades----</h2>
          <ul>
            {pokemon.abilities.map((abilityObj, index) => (
              <li key={index}>
                {abilityObj.ability.name} {abilityObj.is_hidden ? '(Oculta)' : ''}
              </li>
            ))}
          </ul>

          <h2>Índices de Jogos:</h2>
          <ul>
            {pokemon.game_indices.map((game, index) => (
              <li key={index}>
                {game.version.name.toUpperCase()} - Índice do jogo: {game.game_index}
              </li>
            ))}
          </ul>

          <h2>----Itens Retidos----</h2>
          {pokemon.held_items.length > 0 ? (
            <ul>
              {pokemon.held_items.map((itemObj, index) => (
                <li key={index}>
                  {itemObj.item.name.toUpperCase()} - Raridade: {itemObj.version_details[0].rarity}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum item retido.</p>
          )}
        </div>
      ) : (
        !loading && <div>num deu certo :c </div> 
      )}
    </div>
  );
}

export default PokemonData;

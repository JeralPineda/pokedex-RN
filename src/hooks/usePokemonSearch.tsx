/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from "react";

import {pokemonApi} from "../api/pokemon";
import {
  Pokemon,
  PokemonPaginatedResponse,
  SimplePokemon,
} from "../types/pokemon";

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemons, setSimplePokemons] = useState<SimplePokemon[]>([]);

  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      "https://pokeapi.co/api/v2/pokemon?limit=40",
    );

    //Modificar la data de los pokemons
    mapPokemons(resp.data.results);
  };

  const mapPokemons = (pokemons: Pokemon[]) => {
    const newPokemons: SimplePokemon[] = pokemons.map(({name, url}) => {
      const urlParts = url.split("/");
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        name,
        picture,
      };
    });

    setSimplePokemons(newPokemons);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isFetching,
    simplePokemons,
  };
};

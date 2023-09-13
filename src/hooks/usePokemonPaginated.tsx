/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from "react";

import {pokemonApi} from "../api/pokemon";
import {
  Pokemon,
  PokemonPaginatedResponse,
  SimplePokemon,
} from "../types/pokemon";

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemons, setSimplePokemons] = useState<SimplePokemon[]>([]);
  const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon?limit=40");

  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );

    //Almacenar la siguiente pagina
    nextPageUrl.current = resp.data.next;

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

    setSimplePokemons([...simplePokemons, ...newPokemons]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isLoading,
    simplePokemons,
  };
};

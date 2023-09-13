import {useEffect, useRef, useState} from "react";

import {pokemonApi} from "../api/pokemon";
import {
  Pokemon,
  PokemonPaginatedResponse,
  SimplePokemon,
} from "../types/pokemon";

export const usePokemonPaginated = () => {
  const [simplePokemons, setSimplePokemons] = useState<SimplePokemon[]>([]);
  const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon?limit=40");

  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );

    //Almacenar la siguiente pagina
    nextPageUrl.current = resp.data.next;

    //Modificar la data de los pokemons
    mapPokemons(resp.data.results);
  };

  const mapPokemons = (pokemons: Pokemon[]) => {
    pokemons.forEach(poke => console.log(poke.name));
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {};
};

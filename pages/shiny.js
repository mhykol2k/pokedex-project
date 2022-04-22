import Head from 'next/head'
import React, { useState } from 'react';
import { data } from '../utilities/allPokemon'

export default function Home({ pokemonData }) {
  const [pokemon, setPokemon] = useState(pokemonData);

  const search = (term) =>
  setPokemon(
    pokemonData.filter((d) =>
      d.name.toLowerCase().includes(term.toLowerCase())
    )
  );

  return (
    <div>
      <Head>
        <title>NextJS Pokédex</title>
      </Head>

      <main className='bg-gradient-to-t from-yellow-300 to-yellow-200 via-yellow-100 min-h-screen px-4 pt-12 pb-4'>
        <div className='sm:flex sm:justify-center lg:flex lg:justify-center mt-2 block'>
          <div className='flex justify-between items-center pl-1 pr-3 mx-4 py-1 border-b border-gray-600'>
            <input
              className='bg-transparent outline-none font-thin text-gray-600'
              placeholder='Search for a Pokémon'
              type='text'
              onChange={(e) => search(e.target.value)}
            />
          </div>
        </div>

        <div className='flex justify-center items-center flex-wrap w-full mt-8'>
          {pokemon.length === 0 ? ( 
            <h3 className='text-gray-600 gn'>Pokémon Not Found!</h3>
          ) : (
            pokemon.map((Pokemon) => {
              const pokemon_id = Pokemon.url.split("/")[6];
              const padded_id = pokemon_id.padStart(1, "0");
              return(
                <div className='bg-gradient-to-t from-yellow-400 to-yellow-200 p-3 m-1 sm:m-2 border-gray-300 border-2 hover:border-indigo-400 rounded-xl text-center cursor-pointer shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-200'>
                  <h3 className='capitalize text-gray-500 text-center w-full lg:text-xs text-sm'> #{pokemon_id}</h3>
                <div>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${padded_id}.png`}
                    className='w-full h-full bg-gradient-to-tl shadow-inner rounded-full hover:scale-105 selection:border-red-500 transition ease-in '
                    type=''
                    loading='lazy'
                    onClick={() => alert(`${pokemon_id}`)}
                    alt={`${pokemon_id}`}
                  />
                </div>
                <h3 className='capitalise text-gray-600 truncate text-center w-full text-xs'>{Pokemon.name}</h3>
                </div>
            );
          })
          )}
        </div>
      
      </main>

      <footer>

      </footer>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pokemonData: data,
    },
  };
}
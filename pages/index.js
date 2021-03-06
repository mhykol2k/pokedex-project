import Head from 'next/head'
import React, { useState } from 'react';
import { data } from '../utilities/allPokemon'
import Footer from '../components/Footer.jsx'
import { useRouter } from 'next/router'

export default function Home({ pokemonData }) {
  const [pokemon, setPokemon] = useState(pokemonData);

  const [items, setItems] = useState([])

  const addItem = () => {
    setItems([... items, {
      id: items.length,
      value: Math.floor(Math.random() * 3) + 1 //Selected Pokemon
    }])
  }

	const router = useRouter()

  const shinyDex = () => {
    router.push({
        pathname: '/shiny',
    })
  }

  const shadowDex = () => {
    router.push({
        pathname: '/shadow',
    })
  }

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

      <main className='bg-gradient-to-t from-indigo-200 to-pink-200 min-h-screen px-4 pt-12 pb-4'>
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

        <div className='w-24 md:w-28 lg:w-32 xl:w-32 bg-gradient-to-t from-blue-200 to-pink-100  p-3 m-1 sm:m-2 border-gray-300 border-2 hover:border-indigo-400 rounded-xl text-center cursor-pointer shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-200'>
            {
              items.map(item => <li key={item.id}>{item.id}</li>)
            }
        </div>

        <button onClick={shinyDex} >Shiny Dex</button>
        <button onClick={shadowDex} >Shadow Dex</button>

        <div className='flex justify-center items-center flex-wrap w-full mt-8'>
          {pokemon.length === 0 ? ( 
            <h3 className='text-gray-600 gn'>Pokémon Not Found!</h3>
          ) : (
            pokemon.map((Pokemon) => {
              const pokemon_id = Pokemon.url.split("/")[6];
              const padded_id = pokemon_id.padStart(1, "0");
              return(
                <div className='w-24 md:w-28 lg:w-32 xl:w-32 bg-gradient-to-t from-blue-200 to-pink-100  p-3 m-1 sm:m-2 border-gray-300 border-2 hover:border-indigo-400 rounded-xl text-center cursor-pointer shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-200'>
                  <h3 className='capitalize text-gray-500 text-center w-full lg:text-xs text-sm'> #{pokemon_id}</h3>
                <div>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${padded_id}.png`}
                    className='w-full h-full bg-gradient-to-tl shadow-inner rounded-full hover:scale-105 selection:border-red-500 transition ease-in '
                    type=''
                    loading='lazy'
                    onClick={addItem}
                    alt={`${pokemon_id}`}
                  />
                </div>
                <h3 className='capitalize text-gray-600 truncate text-center w-full text-xs'>{Pokemon.name}</h3>
                </div>
            );
          })
          )}
        </div>
      
      </main>

      <Footer />

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
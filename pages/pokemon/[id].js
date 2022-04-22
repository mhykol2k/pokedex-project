import { useRouter } from 'next/router'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'

const pokeDetails = () => {
	const router = useRouter()
 	const {id} = router.query

 	const [pokeInfo, setPokeInfo] = useState(null)
	const [speciesInfo, setSpeciesInfo] = useState(null)
	const [baseColor, setColor] = useState('')

 	useEffect(() => {
		setPokeInfo(null)
		setSpeciesInfo(null)
		axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
			.then(res => {
				setPokeInfo(res.data)
		    	setColor(`${res.data.types[0].type.name}`)	
			    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
			    	.then(res => setSpeciesInfo(res.data))
		})
	}, [id])


 	return (
 		<div className=''>
		</div>
 	 	)
}

export default pokeDetails
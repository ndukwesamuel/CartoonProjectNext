import { GetServerSideProps } from "next";
import Image from "next/image";
import { isContext } from "vm";
import imageLoader from "../../imageLoader";
import { Character, GetCharacterResults } from "../../types";


function CharacterPage({ character }: { character: Character }) {
  return <>
    <h1>{character.name}</h1>

    <Image
      loader={imageLoader}
      unoptimized
      src={character.image}
      alt={character.name}
      width={90}
      height={87}

    />
  </>
}

// export async function getStaticPaths() {
//   const res = await fetch("https://rickandmortyapi.com/api/character");
//   const { results }: GetCharacterResults = await res.json();


//   return {
//     paths: results.map((character) => {
//       return { params: { id: String(character.id) } }
//     }),
//     fallback: false
//   }

// } we want a serverside rending 


export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`)

  const character = await res.json()

  return {
    props: {
      character
    }
  }



}


export default CharacterPage
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  private nextUrl: string


  constructor() {
    this.nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20&ffset=0'
   }

   getPokemons() {
    const url = this.nextUrl
    if(url) {

      const options = {
        url: url,
        header: {},
        params: {}
      }

      return CapacitorHttp.get(options).then(async (response) => {
        let pokemons: Pokemon[] = []
        console.log(response)
        if(response.data) {
          const results = response.data.results
          this.nextUrl = response.data.next
          const promises: Promise<HttpResponse>[] = []

          for (let i = 0; i < results.length; i++) {
            const pokemon = results[i]
            const urlPokemon = pokemon.url
            const options = {
              url: urlPokemon,
              header: {},
              params: {}
            }
            promises.push(CapacitorHttp.get(options))
          }
          await Promise.all(promises).then((responses) => {
            console.log(response)
            for(const response of responses) {
              const pokemonData = response.data
              const pokemonObj = new Pokemon()
              pokemonObj.id = pokemonData.id
              pokemonObj.name = pokemonData.name
              pokemonObj.type1 = pokemonData.types[0].type.name
              if(pokemonData.types[1]){
                pokemonObj.type2 = pokemonData.types[1].type.name
              }
              pokemonObj.sprite = pokemonData.sprites.front_default
              pokemonObj.height = pokemonData.height / 10
              pokemonObj.weight = pokemonData.weight / 10
              pokemonObj.stats = pokemonData.stats
              pokemonObj.abilities = pokemonData.abilities.filter(ab => !ab.is_hidden).map(ab => ab.ability.name)
              const hiddenAbilities = pokemonData.abilities.filter(ab => ab.is_hidden).map(ab => ab.ability.name)
              if(hiddenAbilities) {
                pokemonObj.hiddenAbility = hiddenAbilities.ability.name
              }
              pokemons.push(pokemonObj)

            }
        })
      }
      return pokemons
    })
  }
    return null
}

}

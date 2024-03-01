import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit{

  public pokemons: Pokemon[]


  constructor(private pokemonService: PokemonService) {
    this.pokemons  = []
  }

  ngOnInit() {
    this.morePokemons()
  }

  morePokemons() {
    const promise = this.pokemonService.getPokemons()

    if(promise) {
      promise.then((results: Pokemon[]) => {
        this.pokemons = results
      })
    }

  }

}

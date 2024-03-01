import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit{

  public pokemons: Pokemon[]


  constructor(
    private pokemonService: PokemonService,
    private loadingController: LoadingController,
    private navParams: NavParams,
    private navController: NavController
    ) {
    this.pokemons  = []
  }

  ngOnInit() {
    this.morePokemons()
  }

  async morePokemons($event = null) {
    const promise = this.pokemonService.getPokemons()

    if(promise) {
      let loading = null
      if(!$event){
        loading =  await this.loadingController.create({
          message: 'Cargando...'
        })
        await loading.present()
      }
      promise.then((results: Pokemon[]) => {

        this.pokemons = this.pokemons.concat(results)



        if($event) {
          $event.target.complete()
        }

        if(loading) {
          loading.dismiss()
        }

      }).catch((error) => {
        if($event) {
          $event.target.complete()
        }
        if(loading) {
          loading.dismiss()
        }
      }
        )
    }

  }

  goToDetail(pokemon){
    this.navParams.data["pokemon"] = pokemon
    this.navController.navigateForward('/detail-pokemon', {animated: true})
  }


}

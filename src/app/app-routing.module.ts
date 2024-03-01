import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'list-pokemons',
    loadChildren: () => import('./pages/list-pokemons/list-pokemons.module').then( m => m.ListPokemonsPageModule)
  },
  {
    path: 'detail-pokemon',
    loadChildren: () => import('./pages/detail-pokemon/detail-pokemon.module').then( m => m.DetailPokemonPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Pipe({
  name: 'getStat',
  standalone: true
})
export class GetStatPipe implements PipeTransform {

  transform(value: Pokemon, nameStat: String): number {

    const statFound = value.stats.find(stat => stat.stat.name === nameStat);
    if(statFound) {
      return statFound.base_stat;
    }
    return 0;

  }

}

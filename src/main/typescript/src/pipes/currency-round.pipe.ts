import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyRound'
})
export class CurrencyRoundPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Math.round(value * 100) / 100 ;
  }

}

import {IIdName} from '../models/idname.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataMock {

  getMockData(): IIdName[] {
    return [
      {
        id: "3",
        name: "Belgorod region",
        checked: true
      },
      {
        id: "4",
        name: "Bryansk region",
        checked: true
      },
      {
        id: "5",
        name: "Vladimir region",
        checked: true
      },
      {
        id: "6",
        name: "Voronezh region",
        checked: false
      },
      {
        id: "7",
        name: "Ivanovo region",
        checked: true
      },
      {
        id: "8",
        name: "Kaluga region",
        checked: false
      },
      {
        id: "9",
        name: "Kostroma region",
        checked: true
      }
    ];
  }
}

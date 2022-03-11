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
        name: "Belgorod region"
      },
      {
        id: "4",
        name: "Bryansk region"
      },
      {
        id: "5",
        name: "Vladimir region"
      },
      {
        id: "6",
        name: "Voronezh region"
      },
      {
        id: "7",
        name: "Ivanovo region"
      },
      {
        id: "8",
        name: "Kaluga region"
      },
      {
        id: "9",
        name: "Kostroma region"
      }
    ];
  }
}

import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IIdName } from '../../models/idname.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listData = new ReplaySubject<IIdName[]>();

  get data(): ReplaySubject<IIdName[]> {
    return this.listData;
  }

  setData(newData: IIdName[]) {
    this.listData.next(newData);
  }

}

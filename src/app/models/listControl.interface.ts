import {IIdName} from './idname.model';
import {Observable} from 'rxjs';
import {EventEmitter} from '@angular/core';


export interface ListControlInterface {
  header: string;
  items: IIdName[] | Observable<IIdName[]> | undefined;
  logo: string;
  showSwitcher: boolean;
  showAdd: boolean;
  showDelete: boolean;
  enableSelect: boolean;
  dark: boolean;
  emptyMessage?: string;
  selectorStyle?: 'right-arrow' | '';
  clearSelection?: EventEmitter<void>;
}

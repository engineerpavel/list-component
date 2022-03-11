import { Component } from '@angular/core';
import {ListService} from './components/list/list.service';
import {DataMock} from './mocks/data.mock';
import {ListControlInterface} from './models/listControl.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  listControl: ListControlInterface = {
    header: 'Regions',
    items: this.listService.data,
    logo: '',
    showSwitcher: true,
    showAdd: true,
    showDelete: true,
    enableSelect: true,
    dark: false,
    emptyMessage: '',
    selectorStyle: ''
  }

  constructor(private listService: ListService, private dataMock: DataMock) {
    this.listService.setData(dataMock.getMockData());
  }
}

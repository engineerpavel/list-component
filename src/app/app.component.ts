import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {ListService} from './components/list/list.service';
import {DataMock} from './mocks/data.mock';
import {ListControlInterface} from './models/listControl.interface';
import {IIdName} from './models/idname.model';
import {ListComponent} from './components/list/list.component';
import { v4 as uuidv4 } from 'uuid';
import {map, tap} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  listControl: ListControlInterface = {
    header: 'Regions',
    items: this.listService.data,
    logo: 'stock',
    showSwitcher: true,
    showAdd: true,
    showDelete: true,
    enableSelect: true,
    dark: false,
    emptyMessage: '',
    selectorStyle: ''
  }
  @ViewChild(ListComponent)
  private listComponent: ListComponent | undefined;

  constructor(private listService: ListService, private dataMock: DataMock) {
    this.listService.setData(dataMock.getMockData());
  }

  addItem() {
    if (this.listComponent) {
      const listItem = new IIdName(
        uuidv4(),
        this.listComponent?.filterControl.value, false
      );
      const itemsList = this.listComponent.itemsList
      itemsList.push(listItem);
      this.listService.setData(itemsList);
    }


  }

  selectItem(item: IIdName) {

  }

  deleteItem(item: IIdName) {
    if (this.listComponent) {
      const filteredItems = this.listComponent.itemsList.filter((listItem) => listItem.id !== item.id)
      this.listService.setData(filteredItems);
    }
  }
}

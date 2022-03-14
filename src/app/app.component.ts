import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {ListService} from './components/list/list.service';
import {DataMock} from './mocks/data.mock';
import {ListControlInterface} from './models/listControl.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {IIdName} from './models/idname.model';
import {ListComponent} from './components/list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(private listService: ListService, private dataMock: DataMock) {
    this.listService.setData(dataMock.getMockData());
  }

  @ViewChild(ListComponent)
  private listComponent: ListComponent | undefined;

  addItem() {
    let itemsList = this.listComponent?.itemsList;
    if (itemsList) {
      const listItem = new IIdName(
        this.listComponent?.filterControl.value.concat(itemsList.length),
        this.listComponent?.filterControl.value, false
      );
      itemsList.push(listItem);
    }
  }

  selectItem(item: IIdName) {

  }

  deleteItem(item: IIdName) {

  }
}

import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, isObservable } from 'rxjs';
import { IIdName } from 'src/app/models/idname.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {

  @Input() header: string = '';
  @Input() items: IIdName[] | Observable<IIdName[]> | undefined;
  @Input() logo: string = '';
  @Input() showSwitcher: boolean = false;
  @Input() showAdd: boolean = false;
  @Input() showDelete: boolean = false;
  @Input() enableSelect: boolean = false;
  @Input() dark: boolean = false;
  @Input() emptyMessage: string = 'У вас нет ни одной группы.';
  @Input() selectorStyle: string = 'right-arrow';

  @Input() clearSelection?: EventEmitter<void>;

  @Output() selected = new EventEmitter<IIdName>();
  @Output() addClicked = new EventEmitter();
  @Output() deleteItemClicked = new EventEmitter<IIdName>();

  get isAsc(): boolean {
    return this.sortAsc === 1;
  }


  itemsList: IIdName[] = [];

  filteredItems: IIdName[] = [];
  filterControl = new FormControl('');
  sortAsc = 1;

  selectedItemId: string | undefined;

  constructor() { }

  ngOnInit(): void {
    if (this.items) {
      if (isObservable(this.items)) {
        this.items.subscribe(x => {
          this.itemsList = x;
          this.applyFilter(this.filterControl.value);
          this.applySort();
        });
      } else {
        this.itemsList = this.items;
        this.filteredItems = this.items;
      }
    }

    this.filterControl.valueChanges.subscribe(this.applyFilter);

    if (this.clearSelection) {
      this.clearSelection.subscribe(() => this.selectedItemId = undefined);
    }
  }

  applyFilter = (term: string): void => {
    this.filteredItems = this.itemsList.filter(x => x.name.toUpperCase().indexOf(term.toUpperCase()) >= 0);
  }

  applySort = (): void => {
    this.filteredItems.sort((a, b) => a.name > b.name ? this.sortAsc : -this.sortAsc);
  }

  sort = (): void => {
    this.sortAsc = -this.sortAsc;
    this.applySort();
  }

  selectedHandler = (item: IIdName): boolean => {
    this.selected.emit(item);

    if (this.enableSelect) {
      this.selectedItemId = item.id;
    }

    return false;
  }

  add = (): void => {
    this.addClicked.emit();
  }

  deleteItem = (item: IIdName): boolean => {
    this.deleteItemClicked.emit(item);
    return false;
  }

  switcherClicked = (e: MouseEvent, item: IIdName): void => {
    e.stopPropagation();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
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
    this.filteredItems.sort((a, b) => {
      const checked = this.checkedSort(a, b);
      return checked === 0 ? this.alphabetSort(a, b) : checked;
    });
  }

  sort = (): void => {
    this.sortAsc = -this.sortAsc;
    this.applySort();
  }

  alphabetSort(a:IIdName, b: IIdName): number {
    return (a.name > b.name) ? this.sortAsc : -this.sortAsc;
  }

  checkedSort(a:IIdName, b: IIdName): number {
    if (a.checked && !b.checked) {
      return -1;
    } else if (!a.checked && b.checked) {
      return 1;
    }

    return 0;


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

  deleteItem = (item: IIdName): void => {
    this.deleteItemClicked.emit(item);
  }

  switcherClicked = (e: MouseEvent, item: IIdName): void => {
    e.stopPropagation();
  }
}

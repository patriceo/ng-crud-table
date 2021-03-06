import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Column, Settings, ICrudService} from '../../ng-crud-table';
import {DemoService} from './demo.service';
import {ModalEditFormComponent} from '../../ng-crud-table/modal-edit-form/modal-edit-form.component';

@Component({
  selector: 'modal-form-demo',
  template: `
    <modal-edit-form #modalEditForm
                     [columns]="columns"
                     [item]="item"
                     [settings]="settings"
                     [service]="service"
                     (saved)="onSaved($event)"
                     (updated)="onUpdated($event)"
                     (deleted)="onDeleted($event)"
                     (errors)="onErrors($event)">
    </modal-edit-form>
    <button type="button"
            class="button"
            (click)="createItem()">Create
    </button>
    <button type="button"
            class="button"
            (click)="updateItem()">Edit
    </button>
  `
})

export class ModalFormDemoComponent implements OnInit {

  public service: ICrudService;

  public settings: Settings = {
    api: 'assets/players.json',
    crud: true,
    primaryKey: 'id',
  };

  public columns: Column[] = [
    {
      title: 'Id',
      name: 'id',
      sortable: true,
      filter: true,
      frozen: true,
      width: 100,
    },
    {
      title: 'Name',
      name: 'name',
      sortable: true,
      filter: true,
      frozen: true,
      width: 200,
      validation: {pattern: '^[a-zA-Z ]+$'},
      editable: true,
    },
    {
      title: 'Race',
      name: 'race',
      sortable: true,
      filter: true,
      type: 'dropdown',
      options: [
        {id: 'ASMODIANS', name: 'ASMODIANS'},
        {id: 'ELYOS', name: 'ELYOS'},
      ],
      editable: true,
    },
    {
      title: 'Cascading Select',
      name: 'note',
      editable: true,
      type: 'dropdown',
      optionsUrl: 'assets/options.json',
      dependsColumn: 'race',
    },
    {
      title: 'Gender',
      name: 'gender',
      sortable: true,
      filter: true,
      type: 'radio',
      options: [
        {id: 'MALE', name: 'MALE'},
        {id: 'FEMALE', name: 'FEMALE'},
      ],
      editable: true,
    },
    {
      title: 'Exp',
      name: 'exp',
      sortable: true,
      filter: true,
      type: 'number',
      validation: {required: true, minLength: 2, maxLength: 10},
      editable: true,
    },
    {
      title: 'Last online',
      name: 'last_online',
      sortable: true,
      filter: true,
      type: 'date',
      editable: true,
    },
    {title: 'Account name', name: 'account_name', editable: true},
    {title: 'Account id', name: 'account_id', editable: true},
    {title: 'Player class', name: 'player_class', editable: true},
    {
      title: 'Online',
      name: 'online',
      editable: true,
      type: 'checkbox',
      options: [
        {id: 1, name: 'Online'}
      ]
    }
  ];

  item: any;
  _item: any = {
    'id': 96491,
    'name': 'Defunct',
    'account_id': 19,
    'account_name': 'berserk',
    'exp': 7734770,
    'recoverexp': 0,
    'x': 1024.99,
    'y': 2534.94,
    'z': 228.821,
    'heading': 17,
    'world_id': 220020000,
    'gender': 'MALE',
    'race': 'ASMODIANS',
    'player_class': 'CLERIC',
    'creation_date': '2013-04-14 14:49:52',
    'deletion_date': null,
    'last_online': '2013-04-14 22:51:14',
    'cube_size': 0,
    'advanced_stigma_slot_size': 0,
    'warehouse_size': 0,
    'mailboxLetters': 0,
    'mailboxUnReadLetters': 0,
    'brokerKinah': 0,
    'bind_point': 31,
    'title_id': -1,
    'online': 1
  };

  @ViewChild('modalEditForm') modalEditForm: ModalEditFormComponent;

  constructor(private http: HttpClient) {
    this.service = new DemoService(this.http);
  }

  ngOnInit() {
    this.item = Object.assign({}, this._item);
  }

  onSaved(event) {
    console.log(event);
  }

  onUpdated(event) {
    console.log(event);
  }

  onDeleted(event) {
    console.log(event);
  }

  onErrors(event) {
    if (event) {
      console.log(event);
    }
  }

  createItem() {
    this.item = {};
    this.modalEditForm.open();
  }

  updateItem() {
    this.item = Object.assign({}, this._item);
    this.modalEditForm.open();
  }

}

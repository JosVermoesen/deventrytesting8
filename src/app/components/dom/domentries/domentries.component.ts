import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit } from '@angular/core';

import { DomService } from '../../../_services/dom.service';
import { DomEntry } from '../../../_models/domEntry';
import { DomSaveComponent } from './../domsave/domsave.component';
import { DomLoadComponent } from '../domload/domload.component';

@Component({
  selector: 'app-domentries',
  templateUrl: './domentries.component.html',
  styleUrls: ['./domentries.component.css']
})
export class DomEntriesComponent implements OnInit {
  bsModalRef: BsModalRef;

  domEntries: DomEntry[];
  selectedDomEntry: DomEntry;

  localStorageItems: string[];
  localStorageItemValues: any[];

  loaded = false;
  locationReload = false;

  constructor(
    private domService: DomService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.domService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedDomEntry = {
          id: '',
          endToEndReference: '',
          amount: 0,
          mandateId: '',
          mandateStartDate: '',
          clientName: '',
          clientIban: '',
          communication: ''
        };
      }
    });

    this.domService.getDomEntries().subscribe((result: DomEntry[]) => {
      this.domEntries = result;
      this.loaded = true;
    });
  }

  entriesModalSave() {
    const initialState = {
      title: 'Save Entries list As:'
    };
    this.bsModalRef = this.modalService.show(DomSaveComponent, {
      initialState
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  entriesModalLoad() {
    const initialState = {
      title: 'Load Entries list:'
    };
    this.bsModalRef = this.modalService.show(DomLoadComponent, {
      initialState
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  onSelect(domEntry: DomEntry) {
    this.domService.setFormDomEntry(domEntry);
    this.selectedDomEntry = domEntry;
  }

  onDelete(domEntry: DomEntry) {
    if (confirm('Are you sure?')) {
      this.domService.deleteDomEntry(domEntry);
    }
  }

  clearEntry() {
    if (confirm('Are you sure?')) {
      this.locationReload = true;
      localStorage.removeItem('domEntries_Template');
      location.reload();
    }
  }

  testing() {
    // all data in localStorage
    // const data = Object.assign({}, localStorage);
    // console.log(data);

    // list of all keys
    // Object.keys(localStorage).forEach(key => console.log(key));

    // try a list for keys and values
    // example: ignore 'token' and 'user' items

    /* this.localStorageItems = [];
    this.localStorageItemValues = [];
    for (let i = 0, len = localStorage.length; i < len; i++) {
      const key = localStorage.key(i);
      if (key === 'token' || key === 'user') {
        // skip
      } else {
        const value = localStorage[key];
        this.localStorageItems.push(key);
        this.localStorageItemValues.push(value);

        console.log(key + ' => ' + value);
      }
    } */

    const domToSearch = 'domClient_';
    const lengthOfSearch = domToSearch.length;
    this.localStorageItems = [];
    this.localStorageItemValues = [];
    for (let i = 0, len = localStorage.length; i < len; i++) {
      const key = localStorage.key(i);
      if (key.substring(0, lengthOfSearch) === domToSearch) {
        const value = localStorage[key];
        const itemDescription = key.substring(lengthOfSearch);
        this.localStorageItems.push(itemDescription);
        this.localStorageItemValues.push(value);

        // console.log(domToSearch + itemDescription + ' (key)' + ' => ' + value);
      } else {
        // skip
      }
    }
  }
}

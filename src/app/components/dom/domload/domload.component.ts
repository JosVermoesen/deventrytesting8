import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';

import { DomEntry } from './../../../_models/domEntry';

@Component({
  selector: 'app-domload',
  templateUrl: './domload.component.html',
  styleUrls: ['./domload.component.css']
})
export class DomLoadComponent implements OnInit {
  title: string;
  closeBtnName: string;
  locationReload = false;

  domLoadForm: FormGroup;
  domJson: DomEntry[];

  localStorageItems = [];
  localStorageItemValues = [];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.onChangeGroupType('domClient_');
  }

  onChangeGroupType(groupType) {
    const domToSearch = groupType; // 'domClient_';
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
    this.domLoadForm = this.fb.group({
      groupType: [groupType, Validators.required],
      name: [this.localStorageItems[0], Validators.required],
      deleteAfterLoading: [false]
    });
  }

  onSubmit() {
    if (this.domLoadForm.valid) {
      this.locationReload = true;
      const itemName =
        this.domLoadForm.value.groupType + this.domLoadForm.value.name;
      this.domJson = JSON.parse(localStorage.getItem(itemName));
      localStorage.setItem('domEntries_Template', JSON.stringify(this.domJson));

      if (this.domLoadForm.value.deleteAfterLoading === true) {
        localStorage.removeItem(itemName);
      }
      location.reload();
    }
  }
}

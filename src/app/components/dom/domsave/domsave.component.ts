import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';

import { DomEntry } from './../../../_models/domEntry';

@Component({
  selector: 'app-domsave',
  templateUrl: './domsave.component.html',
  styleUrls: ['./domsave.component.css']
})
export class DomSaveComponent implements OnInit {
  title: string;
  closeBtnName: string;
  locationReload = false;

  domSaveForm: FormGroup;
  domJson: DomEntry[];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.domJson = JSON.parse(localStorage.getItem('domEntries_Template'));
    this.domSaveForm = this.fb.group({
      groupType: [null, Validators.required],
      name: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.domSaveForm.valid) {
      this.locationReload = true;
      const itemName =
        this.domSaveForm.value.groupType + this.domSaveForm.value.name;
      localStorage.setItem(itemName, JSON.stringify(this.domJson));
      // localStorage.removeItem('domEntries_Template');
      location.reload();
    }
  }
}

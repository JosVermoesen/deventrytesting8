import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig, TabsetComponent } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Uuid } from '../../../_functions/uuid';
import { DomService } from '../../../_services/dom.service';
import { DomEntry } from '../../../_models/domEntry';

@Component({
  selector: 'app-domentry',
  templateUrl: './domentry.component.html',
  styleUrls: ['./domentry.component.css']
})
export class DomEntryComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  bsConfig: Partial<BsDatepickerConfig>;
  warning: string;
  domJson: DomEntry[];
  entryCount: number;

  domEntryForm: FormGroup;

  btnAddOrEdit: string;
  isNew = true;

  readyForExport = false;
  countEntries: number;

  constructor(private domService: DomService, private fb: FormBuilder) {}

  ngOnInit() {
    /* this.bsConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY'
    }; */

    // Subscribe to the selectedLog observable
    this.domService.selectedDomEntry.subscribe((entry: DomEntry) => {
      if (entry.id !== null) {
        this.btnAddOrEdit = 'Edit';
        this.selectTab(0);

        this.domEntryForm = this.fb.group({
          id: [entry.id],
          endToEndReference: [entry.endToEndReference],
          amount: [
            entry.amount,
            [Validators.required, Validators.min(0.01), Validators.max(3000)]
          ],
          mandateId: [entry.mandateId, Validators.required],
          mandateStartDate: [entry.mandateStartDate, Validators.required],
          clientName: [entry.clientName, Validators.required],
          clientIban: [entry.clientIban],
          communication: [entry.communication]
        });
        this.isNew = false;
      } else {
        this.clearState();
      }
    });
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  onSubmit() {
    if (this.domEntryForm.valid) {
      const domEntry: DomEntry = Object.assign({}, this.domEntryForm.value);
      if (this.isNew) {
        this.domService.addDomEntry(domEntry);
      } else {
        this.domService.updateDomEntry(domEntry);
      }
    }
    this.selectTab(1);

    // Clear state
    this.clearState();
    // this.ngOnInit();
  }

  onExport() {
    if (confirm('Are you sure?')) {
      // send to booking API
    }
  }

  clearState() {
    this.isNew = true;
    this.btnAddOrEdit = 'Add';
    this.readyForExport = false;

    this.domEntryForm = this.fb.group({
      id: Uuid(),
      endToEndReference: [''],
      amount: [
        null,
        [Validators.required, Validators.min(0.01), Validators.max(3000)]
      ],
      mandateId: [null, Validators.required],
      mandateStartDate: [null, Validators.required],
      clientName: [null, Validators.required],
      clientIban: [null],
      communication: ['']
    });
    this.domService.clearState();
    this.domJson = JSON.parse(localStorage.getItem('domEntries'));
    if (this.domJson == null) {
      this.entryCount = 0;
    } else {
      this.entryCount = this.domJson.length;
    }
  }

  clearEntry() {
    if (confirm('Are you sure?')) {
      localStorage.removeItem('domEntries');
      this.domJson = null;
    }
  }
}

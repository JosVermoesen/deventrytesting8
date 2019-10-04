import { DomService } from './../../../_services/dom.service';
import { DomEntry } from './../../../_models/domEntry';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig, TabsetComponent } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Uuid } from 'src/app/_functions/uuid';

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
          domReference: [entry.domReference, Validators.required],
          domAmount: [
            entry.domAmount,
            [Validators.required, Validators.min(0.01), Validators.max(3000)]
          ],
          domMandateId: [entry.domMandateId, Validators.required],
          domMandateStartDate: [entry.domMandateStartDate, Validators.required],
          domClientName: [entry.domClientName, Validators.required],
          domClientIban: [entry.domClientIban],
          domPaymentReference: [entry.domPaymentReference, Validators.required]
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
      domReference: [null, Validators.required],
      domAmount: [
        null,
        [Validators.required, Validators.min(0.01), Validators.max(3000)]
      ],
      domMandateId: [null, Validators.required],
      domMandateStartDate: [null, Validators.required],
      domClientName: [null, Validators.required],
      domClientIban: [null],
      domPaymentReference: [null, Validators.required]
    });
    this.domService.clearState();
    this.domJson = JSON.parse(localStorage.getItem('domEntries'));
  }

  clearEntry() {
    if (confirm('Are you sure?')) {
      localStorage.removeItem('domEntries');
      this.domJson = null;
    }
  }
}

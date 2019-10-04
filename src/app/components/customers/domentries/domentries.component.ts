import { DomService } from './../../../_services/dom.service';
import { DomEntry } from './../../../_models/domEntry';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-domentries',
  templateUrl: './domentries.component.html',
  styleUrls: ['./domentries.component.css']
})
export class DomEntriesComponent implements OnInit {
  domEntries: DomEntry[];
  selectedDomEntry: DomEntry;

  loaded = false;

  constructor(private domService: DomService) {}

  ngOnInit() {
    this.domService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedDomEntry = {
          id: '',
          domReference: '',
          domAmount: 0,
          domMandateId: '',
          domMandateStartDate: '',
          domClientName: '',
          domClientIban: '',
          domPaymentReference: ''
        };
      }
    });

    this.domService.getDomEntries().subscribe((result: DomEntry[]) => {
      this.domEntries = result;
      this.loaded = true;
    });
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
}

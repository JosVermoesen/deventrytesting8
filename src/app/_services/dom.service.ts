import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { DomEntry } from '../_models/domEntry';

@Injectable()
export class DomService {
  domEntries: DomEntry[];

  private domEntrieSource = new BehaviorSubject<DomEntry>({
    id: null,
    domReference: null,
    domAmount: null,
    domMandateId: null,
    domMandateStartDate: null,
    domClientName: null,
    domClientIban: null,
    domPaymentReference: null
  });

  selectedDomEntry = this.domEntrieSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.domEntries = [];
  }

  getDomEntries(): Observable<DomEntry[]> {
    if (localStorage.getItem('domEntries') === null) {
      this.domEntries = [];
    } else {
      this.domEntries = JSON.parse(localStorage.getItem('domEntries'));
    }

    return of(
      this.domEntries.sort((a, b) => {
        return (b.domDummy = a.domDummy);
      })
    );
  }

  setFormDomEntry(domEntry: DomEntry) {
    this.domEntrieSource.next(domEntry);
  }

  addDomEntry(domEntry: DomEntry) {
    this.domEntries.unshift(domEntry);

    // Add to local storage
    localStorage.setItem('domEntries', JSON.stringify(this.domEntries));
  }

  updateDomEntry(domEntry: DomEntry) {
    this.domEntries.forEach((cur, index) => {
      if (domEntry.id === cur.id) {
        this.domEntries.splice(index, 1);
      }
    });
    this.domEntries.unshift(domEntry);

    // Update local storage
    localStorage.setItem('domEntries', JSON.stringify(this.domEntries));
  }

  deleteDomEntry(domEntry: DomEntry) {
    this.domEntries.forEach((cur, index) => {
      if (domEntry.id === cur.id) {
        this.domEntries.splice(index, 1);
      }
    });

    // Delete from local storage
    localStorage.setItem('domEntries', JSON.stringify(this.domEntries));
  }

  clearState() {
    this.stateSource.next(true);
  }
}

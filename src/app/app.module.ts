import { DomSaveComponent } from './components/dom/domsave/domsave.component';
import { DomLoadComponent } from './components/dom/domload/domload.component';
import { HttpClientModule } from '@angular/common/http';
import { DomEntriesComponent } from './components/dom/domentries/domentries.component';
import { DomEntryComponent } from './components/dom/domentry/domentry.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  ButtonsModule,
  TabsModule,
  BsDatepickerModule,
  ModalModule,
  BsModalRef
} from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { JournalService } from './_services/journal.service';
import { JournalEntryComponent } from './components/journal/journalentry/journalentry.component';
import { JournalEntriesComponent } from './components/journal/journalentries/journalentries.component';

import { DomExportComponent } from './components/dom/domexport/domexport.component';
import { DomService } from './_services/dom.service';
import { DomSettingsComponent } from './components/dom/domsettings/domsettings.component';
import { CheckersComponent } from './components/checkers/checkers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JournalEntryComponent,
    JournalEntriesComponent,
    DomEntryComponent,
    DomEntriesComponent,
    DomSettingsComponent,
    DomExportComponent,
    DomLoadComponent,
    DomSaveComponent,
    CheckersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [JournalService, DomService, BsModalRef],
  entryComponents: [
    DomSettingsComponent,
    DomExportComponent,
    DomLoadComponent,
    DomSaveComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

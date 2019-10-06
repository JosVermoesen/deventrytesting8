import { HttpClientModule } from '@angular/common/http';
import { DomEntriesComponent } from './components/dom/domentries/domentries.component';
import { DomEntryComponent } from './components/dom/domentry/domentry.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';

import { JournalService } from './_services/journal.service';
import { JournalEntryComponent } from './components/journal/journalentry/journalentry.component';
import { JournalEntriesComponent } from './components/journal/journalentries/journalentries.component';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomExportComponent } from './components/dom/domexport/domexport.component';
import { DomService } from './_services/dom.service';
import { DomSettingsComponent } from './components/dom/domsettings/domsettings.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JournalEntryComponent,
    JournalEntriesComponent,
    DomEntryComponent,
    DomEntriesComponent,
    DomExportComponent,
    DomSettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [JournalService, DomService],
  bootstrap: [AppComponent]
})
export class AppModule {}

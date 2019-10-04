import { DomEntry } from '../../_models/domEntry';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dom',
  templateUrl: './dom.component.html',
  styleUrls: ['./dom.component.css']
})
export class DomComponent implements OnInit {
  templateDom: any;
  templateClient: any;
  templateEachClient: any;
  templateClients = '';

  iCount: number;
  cCount: number;
  position: number;

  domFields: string[];
  domData: string[];

  clientFields: string[];
  domEntries: DomEntry[];
  domClientData: string[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('../../../assets/xmltemplates/dom-drctdbttxinf.xml', {
        responseType: 'text' as 'json'
      })
      .subscribe(data => {
        this.templateClient = data;
      });
    this.http
      .get('../../../assets/xmltemplates/dom-document.xml', {
        responseType: 'text' as 'json'
      })
      .subscribe(data => {
        this.templateDom = data;
      });

    this.domFields = [
      'domDescription', // VsoftTool-3.10-all-OK
      'domDateCreated', // 2019-05-07T08:35:04
      'domCount', // 0
      'companyName', // ZAKENKANTOOR H. ROELANDT EN J. VERMOESEN
      'companyNumber', // 0440058217
      'domInfoText', // Verzekeringen 2019 5 van 12
      'domMemoDate', // 2019-05-09
      'companyCountry', // BE
      'companyStreet', // GROTE BAAN 141
      'companyPCPlace', // 9310 HERDERSEM
      'companyIban', // BE83891854037015
      'companyBic', // VDSPBE91
      'companyDomId' // BE02ZZZ0440058217
    ];

    this.clientFields = [
      'domReference', // MEI 2019 VERZ
      'domAmount', // 372.48
      'domMandateId', // VAN BELLE BUYSSE
      'domMandateStartDate', // 2014-07-28
      'domClientName', // VAN BELLE - BUYSSE
      'domClientIban', // BE51001831288662
      'domPaymentReference' // MEI 2019 VERZ
    ];
  }

  generateDomXml() {
    this.domData = [
      'VsoftTool-3.10-all-OK',
      '2019-05-07T08:35:04',
      '2',
      'ZAKENKANTOOR H. ROELANDT EN J. VERMOESEN',
      '0440058217',
      'Verzekeringen 2019 5 van 12',
      '2019-05-09',
      'BE',
      'GROTE BAAN 141',
      '9310 HERDERSEM',
      'BE83891854037015',
      'VDSPBE91',
      'BE02ZZZ0440058217'
    ];

    this.domEntries = [
      {
        id: '1',
        domReference: 'MEI 2019 VERZ',
        domAmount: 50,
        domMandateId: 'DENISE',
        domMandateStartDate: '2014-07-28',
        domClientName: 'ROELANDT DENISE',
        domClientIban: 'BE51001831288662',
        domPaymentReference: 'MEI 2019 VERZ'
      },
      {
        id: '2',
        domReference: 'MEI 2019 VERZ',
        domAmount: 372.48,
        domMandateId: 'VAN BELLE BUYSSE',
        domMandateStartDate: '2014-07-28',
        domClientName: 'VAN BELLE - BUYSSE',
        domClientIban: 'BE51001831288662',
        domPaymentReference: 'MEI 2019 VERZ'
      }
    ];

    this.iCount = 0;
    while (this.iCount < this.domFields.length) {
      const fieldToSearch = '{' + this.domFields[this.iCount] + '}';
      this.position = this.templateDom.indexOf(fieldToSearch);
      while (this.position > 0) {
        this.templateDom = this.templateDom.replace(
          fieldToSearch,
          this.domData[this.iCount]
        );
        this.position = this.templateDom.indexOf(fieldToSearch);
      }
      this.iCount++;
    }

    this.cCount = 0;
    while (this.cCount < this.domEntries.length) {
      this.domClientData = [
        this.domEntries[this.cCount].domReference,
        this.domEntries[this.cCount].domAmount + '',
        this.domEntries[this.cCount].domMandateId,
        this.domEntries[this.cCount].domMandateStartDate,
        this.domEntries[this.cCount].domClientName,
        this.domEntries[this.cCount].domClientIban,
        this.domEntries[this.cCount].domPaymentReference
      ];

      this.iCount = 0;
      this.templateEachClient = this.templateClient;
      while (this.iCount < this.clientFields.length) {
        const fieldToSearch = '{' + this.clientFields[this.iCount] + '}';
        this.position = this.templateEachClient.indexOf(fieldToSearch);
        while (this.position > 0) {
          this.templateEachClient = this.templateEachClient.replace(
            fieldToSearch,
            this.domClientData[this.iCount]
          );
          this.position = this.templateDom.indexOf(fieldToSearch);
        }
        this.iCount++;
      }
      this.cCount++;
      this.templateClients = this.templateClients + this.templateEachClient;
    }
    const stringToReplace = '<Vsoft>{drctdbttxinf}</Vsoft>';
    this.templateDom = this.templateDom.replace(
      stringToReplace,
      this.templateClients
    );
    console.log(this.templateDom);
  }
}

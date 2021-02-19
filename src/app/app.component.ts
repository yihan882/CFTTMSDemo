import { Component, OnInit } from '@angular/core';
import { ReportEventInfo } from './domain/reporteventinfo';
import { EventService } from './services/eventservice';

export class CfttmsEventInfo implements ReportEventInfo {
    constructor(public type?: string, public server?: string,
                public client?: string, public information?: string,
                public createdTime?: string, public createdBy?: string) {}
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [EventService]
})
export class AppComponent implements OnInit {

    displayDialog = false;

    eventinfo: ReportEventInfo = new CfttmsEventInfo();

    selectedInfo!: ReportEventInfo;

    newEventInfo = false;

    eventinfos: ReportEventInfo[] = [];

    cols: any[] = [];

    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.eventService.getEvents().then(eventinfos => this.eventinfos = eventinfos);

        this.cols = [
            { field: 'type', header: '類型' },
            { field: 'server', header: 'Server' },
            { field: 'client', header: 'Client' },
            { field: 'information', header: 'Information' },
            { field: 'createdTime', header: 'CreatedTime' },
            { field: 'createdBy', header: 'CreatedBy' }
        ];
    }

    showDialogToAdd() {
        this.newEventInfo = true;
        this.eventinfo = new CfttmsEventInfo();
        this.displayDialog = true;
    }

    save() {
        const eventinfos = [...this.eventinfos];
        if (this.newEventInfo) {
          eventinfos.push(this.eventinfo);
        } else {
          eventinfos[this.findSelectedInfoIndex()] = this.eventinfo;
        }
        this.eventinfos = eventinfos;
        this.displayDialog = false;
    }

    delete() {
        const index = this.findSelectedInfoIndex();
        this.eventinfos = this.eventinfos.filter((val, i) => i !== index);
        this.displayDialog = false;
    }

    onRowSelect(event: { data: ReportEventInfo; }) {
        this.newEventInfo = false;
        this.eventinfo = {...event.data};
        this.displayDialog = true;
    }

    findSelectedInfoIndex(): number {
        return this.eventinfos.indexOf(this.selectedInfo);
    }
}

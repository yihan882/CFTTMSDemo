import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportEventInfo } from '../domain/reporteventinfo';

@Injectable()
export class EventService {

    constructor(private http: HttpClient) {}

    // tslint:disable-next-line: typedef
    getEvents() {
        return this.http.get<any>('assets/data/reports-event.json')
            .toPromise()
            .then(res => res.data as ReportEventInfo[])
            .then(data => data);
    }
}

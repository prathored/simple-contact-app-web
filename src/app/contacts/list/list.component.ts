import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import * as _ from 'lodash';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    contacts: Array<any>;
    page: number;
    pageEnd: boolean;

    constructor(
        private apiService: ApiService,
        private snackBar: MatSnackBar
    ) {
        this.pageEnd = false;
        this.page = 0;
        this.contacts = [];
        this.fetchContacts();
    }

    ngOnInit() {
    }

    fetchContacts() {
        this.apiService.listContacts(this.page)
            .subscribe(
                (response: any) => {
                    console.log(response);
                    if (response.contacts.length === 0) {
                        this.pageEnd = true;
                        this.openSnackBar('You reached to end of the list', 'Dismiss');
                    }
                    this.contacts = _.concat(this.contacts, response.contacts);
                    console.log(this.contacts);
                },
                (error: any) => {
                    console.log(error);
                    if (error.status === 0) {
                        this.openSnackBar('Network error', 'Dismiss');
                    } else {
                        this.openSnackBar(error.error.error, 'Dismiss');
                    }
                },
                () => {
                    console.log('Done fetching contacts list');
                }
            );
    }

    loadMore() {
        this.page = this.page + 1;
        this.fetchContacts();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {duration: 2000});
    }

}

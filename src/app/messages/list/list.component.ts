import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    messages: Array<any>;
    page: number;
    pageEnd: boolean;

    constructor(
        private apiService: ApiService,
        private snackBar: MatSnackBar
    ) {
        this.pageEnd = false;
        this.page = 0;
        this.messages = [];
        this.fetchMessages();
    }

    ngOnInit() {
    }

    fetchMessages() {
        this.apiService.listMessages(this.page)
            .subscribe(
                (response: any) => {
                    console.log(response);
                    if (response.messages.length === 0) {
                        this.pageEnd = true;
                        this.openSnackBar('You reached to end of the list', 'Dismiss');
                    } else {
                        response.messages.forEach((message) => {
                            message.createdAt = moment(message.createdAt).format('h:mm:ss a, MMMM DD, YYYY');
                        });
                    }
                    this.messages = _.concat(this.messages, response.messages);
                    console.log(this.messages);
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
                    console.log('Done fetching messages list');
                }
            );
    }

    loadMore() {
        this.page = this.page + 1;
        this.fetchMessages();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {duration: 2000});
    }

}

import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-compose',
    templateUrl: './compose.component.html',
    styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {

    otp: number;
    message: string;
    contactId: string;

    constructor(
        private apiService: ApiService,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.contactId = params.contactId;
            this.apiService.generateOtp()
                .subscribe(
                    (response: any) => {
                        console.log(response);
                        this.otp = response.otp;
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
                        console.log('Done fetching OTP');
                    }
                );
        });
    }

    ngOnInit() {
    }

    sendMessage() {
        if (!this.message) {
            this.openSnackBar('Message is required', 'Dimiss');
            return;
        }
        if (!this.otp) {
            this.openSnackBar('OTP is required', 'Dimiss');
            return;
        }
        this.apiService.sendMessage(this.contactId, {message: this.message, otp: this.otp})
            .subscribe(
                (response: any) => {
                    console.log(response);
                    this.openSnackBar('Message successfully sent.', 'Ok');
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
                    console.log('Done sending message');
                }
            );
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {duration: 2000});
    }

}

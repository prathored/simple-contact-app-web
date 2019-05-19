import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../../api.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

    contactId: string;
    contact: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private apiService: ApiService,
        private snackBar: MatSnackBar
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.contactId = params.contactId;
            this.apiService.getContact(this.contactId)
                .subscribe(
                    (response: any) => {
                        console.log(response);
                        this.contact = response.contact;
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
                        console.log('Done fetching contact');
                    }
                );
        });
    }

    ngOnInit() {
    }

    gotoCompose() {
        this.router.navigate(['/contacts/' + this.contact._id + '/compose']);
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {duration: 2000});
    }

}

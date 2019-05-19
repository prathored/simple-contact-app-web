import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private apiService: ApiService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    seedData() {
        this.apiService.generateFakeContacts()
            .subscribe(
                (response: any) => {
                    console.log(response);
                    this.router.navigate(['/contacts/list']);
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
                    console.log('Done generating contacts');
                }
            );
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {duration: 2000});
    }

}

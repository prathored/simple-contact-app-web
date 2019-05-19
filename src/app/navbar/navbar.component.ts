import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    gotoPage(page: string) {
        switch (page) {
            case 'contacts':
                this.router.navigate(['/contacts/list']);
                break;
            case 'messages':
                this.router.navigate(['/messages/list']);
                break;
            case 'home':
                this.router.navigate(['/']);
                break;
            default:
                this.router.navigate(['/']);
        }
    }

}

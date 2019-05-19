import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactsRoutingModule} from './contacts-routing.module';
import {MaterialModule} from '../material/material.module';
import {ListComponent} from './list/list.component';
import {InfoComponent} from './info/info.component';
import {ComposeComponent} from './compose/compose.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [ListComponent, InfoComponent, ComposeComponent],
    imports: [
        CommonModule,
        ContactsRoutingModule,
        MaterialModule,
        FormsModule
    ]
})
export class ContactsModule {
}

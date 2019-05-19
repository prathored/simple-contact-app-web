import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MessagesRoutingModule} from './messages-routing.module';
import {MaterialModule} from '../material/material.module';
import {ListComponent} from './list/list.component';

@NgModule({
    declarations: [ListComponent],
    imports: [
        CommonModule,
        MessagesRoutingModule,
        MaterialModule
    ]
})
export class MessagesModule {
}

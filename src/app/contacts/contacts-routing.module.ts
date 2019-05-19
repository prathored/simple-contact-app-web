import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component';
import {InfoComponent} from './info/info.component';
import {ComposeComponent} from './compose/compose.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: ':contactId',
        component: InfoComponent
    },
    {
        path: ':contactId/compose',
        component: ComposeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule {
}

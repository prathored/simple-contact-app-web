import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseUrl = 'http://localhost:3000/api';
    serverV1 = this.baseUrl + '/v1/';

    constructor(
        private http: HttpClient
    ) {
    }

    generateFakeContacts() {
        return this.http.post(this.serverV1 + 'contacts', {message: 'generate data'});
    }

    listContacts(page: number) {
        return this.http.get(this.serverV1 + 'contacts?page=' + page);
    }

    getContact(contactId: string) {
        return this.http.get(this.serverV1 + 'contacts/' + contactId);
    }

    generateOtp() {
        return this.http.get(this.serverV1 + 'messages/generateOtp');
    }

    sendMessage(contactId: string, data: any) {
        return this.http.post(this.serverV1 + 'contacts/' + contactId + '/message', data);
    }

    listMessages(page: number) {
        return this.http.get(this.serverV1 + 'messages?page=' + page);
    }

}

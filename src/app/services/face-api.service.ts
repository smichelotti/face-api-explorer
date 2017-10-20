import { Inject, Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { FaceApiMetadataService } from './face-api-metadata.service';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class FaceApiService {

    constructor(private http: Http, private faceApiMetadata: FaceApiMetadataService, private toastr: ToasterService) { }

    // Person Group Operations
    getPersonGroups() {
        return this.httpGet(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups`);
    }

    getPersonGroup(personGroupId) {
        return this.httpGet(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}`);
    }

    createPersonGroup(personGroup) {
        return this.httpPut(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroup.personGroupId}`, personGroup);
    }

    deletePersonGroup(personGroupId) {
        return this.httpDelete(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}`);
    }

    trainPersonGroup(personGroupId) {
        return this.httpPost(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}/train`, null);
    }

    getPersonGroupTrainingStatus(personGroupId) {
        return this.httpGet(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}/training`);
    }



    // ***** Persons Operations *****

    getPersons(personGroupId) {
        return this.httpGet(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}/persons`);
    }

    // ***** Person Operations *****

    createPerson(personGroupId, person) {
        return this.httpPost(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}/persons`, person).map(response => response.json());
    }

    getPerson(personGroupId, personId) {
        return this.httpGet(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}/persons/${personId}`);
    }

    deletePerson(personGroupId, personId) {
        return this.httpDelete(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}/persons/${personId}`);
    }

    // ***** Person Face Operations *****
    addPersonFace(personGroupId, personId, url) {
        return this.httpPost(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}/persons/${personId}/persistedFaces?userData=${url}`, { url: url }).map(response => response.json());        
    }

    getPersonFace(personGroupId, personId, faceId) {
        return this.httpGet(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}/persons/${personId}/persistedFaces/${faceId}`);
    }

    deletePersonFace(personGroupId, personId, faceId) {
        return this.httpDelete(`${this.faceApiMetadata.selectedFaceEndpoint}/persongroups/${personGroupId}/persons/${personId}/persistedFaces/${faceId}`);
    }

    // ***** Face Testing Operations *****

    detectFaces(url) {
        return this.httpPost(`${this.faceApiMetadata.selectedFaceEndpoint}/detect?returnFaceAttributes=age,gender,facialHair,smile,glasses,emotion`, { url: url }).map(response => response.json());
    }

    identifyFaces(personGroupId, faceIds) {
        let request = {
            personGroupId: personGroupId,
            faceIds: faceIds
        };
        return this.httpPost(`${this.faceApiMetadata.selectedFaceEndpoint}/identify`, request).map(response => response.json());
    }





    // Private Methods

    private httpGet(url) {
        let headers = this.createHttpHeaders();
        return this.http.get(url, { headers: headers }).map(response => response.json()).catch((res:Response) => {
            this.toastr.pop('error', res.toString());
            return Observable.of([]);
        });
    }

    private httpPost(url, item) {
        let headers = this.createHttpHeaders();
        return this.http.post(url, item, { headers: headers });
    }

    private httpPut(url, item) {
        let headers = this.createHttpHeaders();
        return this.http.put(url, item, { headers: headers });
    }

    private httpDelete(url) {
        let headers = this.createHttpHeaders();
        return this.http.delete(url, { headers: headers });
    }

    private createHttpHeaders() {
        let headers = new Headers();
        headers.append('Ocp-Apim-Subscription-Key', this.faceApiMetadata.faceApiKey);
        return headers;
    }


    

}
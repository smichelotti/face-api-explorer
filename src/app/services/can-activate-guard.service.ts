import { Injectable } from '@angular/core';
import { FaceApiMetadataService } from './face-api-metadata.service';
import { CanActivate } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class CanActivateGuard implements CanActivate {
    
    constructor(private faceApiMetadata: FaceApiMetadataService, public toastr: ToasterService) { }

    canActivate() {
        let canActivate = (this.faceApiMetadata.faceApiKey.length !== 0 && this.faceApiMetadata.selectedFaceEndpoint.length !== 0);
        if (!canActivate) {
            this.toastr.pop('warning', 'You must first specify the API Endpoint and Key!');
        }
        return canActivate;
    }

}
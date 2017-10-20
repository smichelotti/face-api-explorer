import { Component, OnInit } from '@angular/core';
import { FaceApiService } from '../services/face-api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';
import { ConfirmModalComponent, ConfirmModalProperties } from '../shared-components/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FaceEditorModal } from '../face-editor/face-editor.modal';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  public busy: Subscription;
  public person: any = {};
  public personFaces = [];
  public personGroupId: string;
  public personId: string;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private navRouter: Router,
    private faceApi: FaceApiService,
    public toastr: ToasterService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.personGroupId = params.personGroupId;
      this.personId = params.personId;
      this.busy = this.faceApi.getPerson(this.personGroupId, this.personId).subscribe(data => this.person = data);
    });
  }

  deletePerson() {
    let modalRef = this.modal.open(ConfirmModalComponent);
    modalRef.componentInstance.properties = <ConfirmModalProperties>{ 
      title: 'Delete Person?', 
      message: 'Are you sure you want to delete this Person?',  
      buttons: ['Yes (Delete)', 'No'] };
    modalRef.result.then(result => {
      this.busy = this.faceApi.deletePerson(this.personGroupId, this.personId).subscribe(() => {
        this.navRouter.navigate(['../../'], { relativeTo: this.route });
      });
    }, reason => reason);
  }

  addPersonFace() {
    let modalRef = this.modal.open(FaceEditorModal);
    modalRef.result.then(result => {
      this.busy = this.faceApi.addPersonFace(this.personGroupId, this.personId, result.url).subscribe(savedItem => {
        this.person.persistedFaceIds.push(savedItem.persistedFaceId);
        this.toastr.pop('success', 'Created', 'New Person Face created');
      });
    }, reason => reason);

  }

}

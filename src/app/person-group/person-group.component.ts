import { Component, OnInit } from '@angular/core';
import { FaceApiService } from '../services/face-api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { ToasterService } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonEditorModal } from '../person-editor/person-editor.modal';
import { ConfirmModalComponent, ConfirmModalProperties } from '../shared-components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-person-group',
  templateUrl: './person-group.component.html',
  styleUrls: ['./person-group.component.css']
})
export class PersonGroupComponent implements OnInit {
  public busy: Subscription;
  public personGroup = {};
  public personGroupId: string;
  public persons = [];
  
  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private navRouter: Router,
    private faceApi: FaceApiService,
    public toastr: ToasterService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.personGroupId = params.personGroupId;
      this.busy = Observable.forkJoin([
        this.faceApi.getPersonGroup(this.personGroupId),
        this.faceApi.getPersons(this.personGroupId)
      ]).subscribe(data => {
        this.personGroup = data[0];
        this.persons = data[1];
        });
      });
  }

  createPerson() {
    let modalRef = this.modal.open(PersonEditorModal);
    modalRef.result.then(result => {
      this.busy = this.faceApi.createPerson(this.personGroupId, {name: result.name, userData: result.userData}).subscribe(savedItem => {
        result.personId = (<any>savedItem).personId;
        this.persons.push(result);
        this.toastr.pop('success', 'Created', 'New Person created');
      });
    }, reason => reason);
  }

  deletePersonGroup() {
    let modalRef = this.modal.open(ConfirmModalComponent);
    modalRef.componentInstance.properties = <ConfirmModalProperties>{ title: 'Delete Person Group?', message: 'Are you sure you want to delete this Person Group?', buttons: ['Yes (Delete)', 'No'] };
    modalRef.result.then(result => {
      this.busy = this.faceApi.deletePersonGroup(this.personGroupId).subscribe(() => this.navRouter.navigateByUrl('/person-groups'));
    }, reason => reason);
  }

  trainModel() {
    this.busy = this.faceApi.trainPersonGroup(this.personGroupId).subscribe(() => {
      this.toastr.pop('info', 'Training Initiated', 'Training has been initiated...');
    });
  }

  checkTrainingStatus() {
    this.busy = this.faceApi.getPersonGroupTrainingStatus(this.personGroupId).subscribe(result => {
      //let status = <TrainingStatus>result.status;
      console.log('***training status reslt', status);
      //switch (status) {
      switch (result.status) {
        case 'succeeded':
          this.toastr.pop('success', 'Training Succeeded');
          break;
        case 'running':
          this.toastr.pop('info', 'Training still in progress...', 'Check back later');
          break;
        case 'failed':
          this.toastr.pop('error', 'Error during Training', result.message);
          break;
        default:
          this.toastr.pop('error', `Unknown training status - ${status}`);
          break;
      }
    });

  }


}

import { Component, OnInit } from '@angular/core';
import { FaceApiService } from '../services/face-api.service';
import { Subscription } from 'rxjs';
import { PersonGroupEditorModal } from '../person-group-editor/person-group-editor.modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-person-groups',
  templateUrl: './person-groups.component.html',
  styleUrls: ['./person-groups.component.css']
})
export class PersonGroupsComponent implements OnInit {
  public busy: Subscription;
  public personGroups = [];

  constructor(
    private modal: NgbModal,
    private faceApi: FaceApiService,
    public toastr: ToasterService) { }

  ngOnInit() {
    this.busy = this.faceApi.getPersonGroups().subscribe(data => this.personGroups = data);
  }

  createPersonGroup() {
    let modalRef = this.modal.open(PersonGroupEditorModal);
    modalRef.result.then(result => {
      this.busy = this.faceApi.createPersonGroup(result).subscribe(savedItem => {
        this.personGroups.push(result);
        this.toastr.pop('success', 'Created', 'New Person Group created');
      });
    }, reason => reason);
  }

}

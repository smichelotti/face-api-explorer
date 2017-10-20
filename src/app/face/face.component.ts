import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FaceApiService } from '../services/face-api.service';
import { ToasterService } from 'angular2-toaster';
import { ConfirmModalComponent, ConfirmModalProperties } from '../shared-components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css']
})
export class FaceComponent implements OnInit {
  public face: any = {};
  public personGroupId: string;
  public personId: string;
  public faceId: string;
  public busy: Subscription;

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
      this.faceId = params.faceId;
      this.busy = this.faceApi.getPersonFace(this.personGroupId, this.personId, this.faceId).subscribe(data => this.face = data);
    });
  }

  deletePersonFace() {
    let modalRef = this.modal.open(ConfirmModalComponent);
    modalRef.componentInstance.properties = <ConfirmModalProperties>{
      title: 'Delete PersonFace ?',
      message: 'Are you sure you want to delete this Person Face?',
      buttons: ['Yes (Delete)', 'No']
    };
    modalRef.result.then(result => {
      this.busy = this.faceApi.deletePersonFace(this.personGroupId, this.personId, this.faceId).subscribe(() => {
        this.navRouter.navigate(['../../'], { relativeTo: this.route });
      });
    }, reason => reason);
  }

}

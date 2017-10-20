import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'person-group-editor',
    templateUrl: 'person-group-editor.modal.html'
})
export class PersonGroupEditorModal implements OnInit {
    public action = 'Add';
    public editableItem = {};//: any;
    public entry: any;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        if (this.entry) {
            this.action = 'Update';
            this.editableItem = _.cloneDeep(this.entry);
        }

    }

    save() {
        this.activeModal.close(this.editableItem);
    }
}
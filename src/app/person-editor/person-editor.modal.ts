import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'person-editor',
    templateUrl: 'person-editor.modal.html'
})
export class PersonEditorModal implements OnInit {
    public action = 'Add';
    public editableItem = {};//: any;
    public entry: any;

    constructor(public activeModal: NgbActiveModal) { }

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
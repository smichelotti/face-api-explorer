import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Third Party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusyModule } from 'angular2-busy';
import { ToasterModule } from 'angular2-toaster';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { PersonGroupsComponent } from './person-groups/person-groups.component';
import { FaceApiService } from './services/face-api.service';
import { PersonGroupEditorModal } from './person-group-editor/person-group-editor.modal';
import { PersonGroupComponent } from './person-group/person-group.component';
import { PersonEditorModal } from './person-editor/person-editor.modal';
import { ConfirmModalComponent } from './shared-components/confirm-modal/confirm-modal.component';
import { PersonComponent } from './person/person.component';
import { FaceEditorModal } from './face-editor/face-editor.modal';
import { FaceComponent } from './face/face.component';
import { FaceTesterComponent } from './face-tester/face-tester.component';
import { FaceApiMetadataService } from './services/face-api-metadata.service';
import { CanActivateGuard } from './services/can-activate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmModalComponent,
    FaceEditorModal,
    NavMenuComponent,
    HomeComponent,
    PersonGroupsComponent,
    PersonGroupEditorModal,
    PersonEditorModal,
    PersonGroupComponent,
    PersonComponent,
    FaceComponent,
    FaceTesterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BusyModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ToasterModule
  ],
  providers: [
    CanActivateGuard,
    FaceApiService,
    FaceApiMetadataService
  ],
  bootstrap: [
    AppComponent,
    NavMenuComponent
  ],
  entryComponents: [
    ConfirmModalComponent,
    FaceEditorModal,
    PersonGroupEditorModal,
    PersonEditorModal
  ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonGroupsComponent } from './person-groups/person-groups.component';
import { PersonGroupComponent } from './person-group/person-group.component';
import { PersonComponent } from './person/person.component';
import { FaceComponent } from './face/face.component';
import { FaceTesterComponent } from './face-tester/face-tester.component';
import { CanActivateGuard } from './services/can-activate-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'person-groups', component: PersonGroupsComponent, canActivate: [CanActivateGuard] },
  { path: 'person-groups/:personGroupId', component: PersonGroupComponent, canActivate: [CanActivateGuard] },
  { path: 'person-groups/:personGroupId/persons/:personId', component: PersonComponent, canActivate: [CanActivateGuard] },
  { path: 'person-groups/:personGroupId/persons/:personId/faces/:faceId', component: FaceComponent, canActivate: [CanActivateGuard] },
  { path: 'test-faces', component: FaceTesterComponent, canActivate: [CanActivateGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { FaceApiMetadataService } from '../services/face-api-metadata.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(public faceApiMetadata: FaceApiMetadataService) { }

  ngOnInit() {
  }

}

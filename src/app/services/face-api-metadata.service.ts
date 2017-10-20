import { Injectable } from '@angular/core';

@Injectable()
export class FaceApiMetadataService {
  public selectedFaceEndpoint = '';
  public faceApiKey = '';
  public validBaseUrls = [ 
    'https://virginia.api.cognitive.microsoft.us/face/v1.0',
    'https://westus.api.cognitive.microsoft.com/face/v1.0',
    'https://westus2.api.cognitive.microsoft.com/face/v1.0',
    'https://eastus.api.cognitive.microsoft.com/face/v1.0',
    'https://eastus2.api.cognitive.microsoft.com/face/v1.0',
    'https://westcentralus.api.cognitive.microsoft.com/face/v1.0',
    'https://southcentralus.api.cognitive.microsoft.com/face/v1.0',
    'https://westeurope.api.cognitive.microsoft.com/face/v1.0',
    'https://northeurope.api.cognitive.microsoft.com/face/v1.0',
    'https://southeastasia.api.cognitive.microsoft.com/face/v1.0',
    'https://eastasia.api.cognitive.microsoft.com/face/v1.0',
    'https://australiaeast.api.cognitive.microsoft.com/face/v1.0',
    'https://brazilsouth.api.cognitive.microsoft.com/face/v1.0'
  ];

  constructor() { }

}

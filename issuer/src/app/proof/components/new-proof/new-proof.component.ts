import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { AgentService } from 'src/app/services/agent.service';
import { NewProof } from 'src/app/models/new-proof';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-new-proof',
  templateUrl: './new-proof.component.html',
  styleUrls: ['./new-proof.component.scss']
})
export class NewProofComponent implements OnInit {
  //the proofForm matches the web ui form elements in its associated html page
  proofForm = this.fb.group({
    connectionID: [''],
    comment: [''],
    requestName: [''],
    credentialDefinitionId: [''],
    attributes: this.fb.array([
      this.fb.control('')
    ]),
    predicates: this.fb.array([
      this.fb.control('')
    ])
  });

  //below variables are used to form a API payload
  payload: any;
  comment: any;
  connectionID: any;
  requestName: any;
  credentialDefinitionId: any;
  requestedAttributes: any = {};
  requestedPredicates: any = {};
  nonRevoked: any;
  proofRequest: any;
  proofRequestResult = 'not started yet';

  //below variables are used to display data after successfully calling the API  
  proofValidUntil: any;
  attributeKeys: any;
  attributeValues: any;
  predicateKeys: any;
  predicateValues: any;

  attribute: any;
  predicate: any;

  constructor(private fb: FormBuilder, private agentService: AgentService) { }

  ngOnInit(): void {
    this.getEpochOfCurrentDate();

  }

  get attributes() {
    return this.proofForm.get('attributes') as FormArray;
  }

  get predicates() {
    return this.proofForm.get('predicates') as FormArray;
  }

  getBodyPayloadParameters() {
    this.comment = this.proofForm.value.comment;
    this.connectionID = this.proofForm.value.connectionID;
    this.requestName = this.proofForm.value.requestName;
    this.credentialDefinitionId = this.proofForm.value.credentialDefinitionId;
    this.constructAttributes(this.proofForm.value.attributes);
    // this.constructPredicates(this.proofForm.value.predicates);
  }

  onSubmit() {
    this.getBodyPayloadParameters();
    this.payload = new NewProof().updateBodyPayLoadTemplate(this.comment, this.connectionID, this.requestName, this.credentialDefinitionId, this.requestedAttributes, this.requestedPredicates);
    console.log('payload in onSubmit:', this.payload.bodyPayloadTemplate);
    this.agentService.sendProofRequest(this.payload.bodyPayloadTemplate)
      .pipe(
        filter((proofRequest: any) => !!proofRequest),
        map((proofRequest: any) => {
          this.proofRequest = proofRequest;
          console.log('proofRequest:', this.proofRequest);
        })
      )
      .subscribe(
        res => {
          console.log('Response in onSubmitCredentialIssuance:', res);
          console.log(this.proofRequest);
        },
        err => {
          console.log('Error in onSubmitCredentialIssuance:', err);
          this.proofRequestResult = "failed";
        },
        () => {
          this.proofRequestResult = "success";
          //this.covertEpochToLocalDate(this.proofRequest.presentation_request.non_revoked.to);
          this.getAttributes();
          console.log(this.proofRequest);
          this.getPredicates();
          console.log(this.payload);

        });
  }

  addAttribute() {
    this.attributes.push(this.fb.control(''));
  }

  addPredicate() {
    this.predicates.push(this.fb.control(''));
  }

  covertEpochToLocalDate(epoch) {
    this.proofValidUntil = new Date(epoch*1000);
  }

  getAttributes() {
    this.attributeKeys = Object.keys(this.proofRequest.by_format.pres_request.indy.requested_attributes);
    this.attributeValues = Object.values(this.proofRequest.by_format.pres_request.indy.requested_attributes);
  }

  getPredicates() {
    this.predicateKeys = Object.keys(this.proofRequest.by_format.pres_request.indy.requested_predicates);
    this.predicateValues = Object.values(this.proofRequest.by_format.pres_request.indy.requested_predicates);
  }

  getEpochOfCurrentDate() {
    this.nonRevoked = Math.floor(new Date().getTime() / 1000);
  }

  constructAttributes(attributes) {
    for (let i = 0; i < attributes.length; i++) {
      this.attribute = {
        "name": attributes[i],
        "restrictions": [
          {
            "cred_def_id": this.credentialDefinitionId
          }
        ]
      };
      this.requestedAttributes['attrProp' + (i + 1)] = this.attribute; 
    }
  }

  constructPredicates(predicates) {
    for (let i = 0; i < predicates.length; i++) {
      this.predicate = { 
        "restrictions": [
          {
             
          }
        ]
      }
      this.requestedPredicates['predProp' + (i + 1)] = this.predicate;
    }
  }

  // constructPredicates(predicates) {
  //   for (let i = 0; i < predicates.length; i++) {
  //     this.predicate = {
  //       "name": predicates[i].split(" ")[0],
  //       "p_type": predicates[i].split(" ")[1],
  //       "p_value": parseInt(predicates[i].split(" ")[2]),
  //       "restrictions": [
  //         {
  //           "cred_def_id": this.credentialDefinitionId  
  //         }
  //       ]
  //     }
  //     this.requestedPredicates['predProp' + (i + 1)] = this.predicate;
  //   }
  // }
}

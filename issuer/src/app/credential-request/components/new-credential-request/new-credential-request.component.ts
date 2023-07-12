import { Component, OnInit, Input } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { SainoService } from 'src/app/services/saino.service';
import { filter, map, tap } from 'rxjs/operators';
import { NewCredentialRequest } from 'src/app/models/new-credential-request';

@Component({
  selector: 'app-new-credential-request',
  templateUrl: './new-credential-request.component.html',
  styleUrls: ['./new-credential-request.component.scss']
})
export class NewCredentialRequestComponent implements OnInit {
  public credentialRequest: any;
  public credentialRequestObject: any;
  public payload: any;
  public connectionID: String;
  public comment: String;
  public attributeValues: string[] = [];
  public schema: any;
  public schemaID: any;
  public definitionID: any;
  public attributeNumber: any;
  public employeeName: any;
  public employeeIC: any;
  public employeeSelected: any = 
    {
      "position": "",
      "employmentDate": "",
      "currentSalary": ""
    };
  
  constructor(private agentService: AgentService, private sainoService: SainoService) { }

  ngOnInit(): void {  
  }

  onSearch() {
    this.agentService.getSchemas(this.schemaID)
    .pipe(
      map((schema: any) => {
        this.schema = schema;
      })
    )
    .subscribe()
    this.setEmployeeData();

  }

  setEmployeeData(){
    this.sainoService.getEmployeeStatus(this.employeeName,this.employeeIC)
    .pipe(
      tap((data: any) => {
        if(data.success == true){
          console.log('1');
          for (let i = 0; i < this.schema.attrNames.length; i++) {
            if(this.schema.attrNames[i]== "position" ){
              this.attributeValues[i] = data.position;
            }else if(this.schema.attrNames[i]== "employmentDate" ){
              this.attributeValues[i] = data.employmentDate;
            }else if(this.schema.attrNames[i]== "currentSalary" ){
              this.attributeValues[i] = data.currentSalary.toString();
            }else if(this.schema.attrNames[i]== "name" ){
              this.attributeValues[i] = this.employeeName;
            }else if(this.schema.attrNames[i]== "ic" ){
              this.attributeValues[i] = this.employeeIC;
            }
          }
    }
    }
    )
    )
    .subscribe()
  }

  onSubmit() {

    this.onSearch();   
    this.payload = new NewCredentialRequest().addNewAttributeKeyPair(this.schemaID, this.schema.attrNames, this.attributeValues, this.connectionID, this.definitionID, this.comment);
    this.agentService.sendCredentialOffer(this.payload.bodyPayloadTemplate)
      .pipe(
        filter((credentialRequest: any) => !!credentialRequest),
        map((credentialRequest: any) => {
          this.credentialRequest = credentialRequest;
          this.credentialRequestObject = this.credentialRequest && JSON.stringify(this.credentialRequest, null, 4) || '';
          this.credentialRequestObject = JSON.parse(this.credentialRequestObject);
        })
      )
      .subscribe();
  }
}


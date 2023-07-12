import { Component, OnInit, Input } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-definition-card',
  templateUrl: './definition-card.component.html',
  styleUrls: ['./definition-card.component.scss']
})
export class DefinitionCardComponent implements OnInit {
  @Input() definitionID: any;
  definitionDetail: any;
  schema: any;
  schemaID: any;
  suppRevo: boolean;

  constructor(private agentService: AgentService) { }

  ngOnInit(): void {

  }

  getDefinitionDetail() {
    this.agentService.getDefinitions(this.definitionID)
      .pipe(
        map((definitionDetail: any) => {
          this.definitionDetail = definitionDetail;
          this.suppRevo = JSON.stringify(this.definitionDetail.value).includes('revocation');
          console.log(this.suppRevo)
        })
      )
      .subscribe()

    // this.agentService.getSchemas(this.schemaID)
    // .pipe(
    //   map((schema: any) => {
    //     this.schema = schema;
    //     // console.log(schema?.attrNames);
    //   })
      
    // )
    // .subscribe()
  }

}

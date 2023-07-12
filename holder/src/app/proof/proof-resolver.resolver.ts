import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgentService } from '../services/agent.service';

@Injectable({
  providedIn: 'root'
})
export class ProofResolverService implements Resolve<any[]> {

  constructor(private agentService: AgentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.agentService.getProofs()
      .pipe(
        map((proofReqs: any[]) => {
          if (route.routeConfig.path === 'received') {
            return proofReqs.filter((proofReq: any) => proofReq.state === 'request-received' || proofReq.state === 'presentation-received' || proofReq.state === 'abandoned' || proofReq.state ==='done');
          } else if (route.routeConfig.path === 'requested') {
            return proofReqs.filter((proofReq: any) => proofReq.state === 'request-sent' || proofReq.state === 'presentation-sent' || proofReq.state === 'presentation-acked');
          }
        })
      );
  }
}

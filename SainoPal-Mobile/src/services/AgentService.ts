import type { Axios } from "axios";

type Connection = {
  my_did: string;
  updated_at: string;
  rfc23_state: string;
  accept: string;
  their_label: string;
  their_did: string;
  created_at: string;
  routing_state: string;
  invitation_mode: string;
  connection_protocol: string;
  invitation_key: string;
  their_role: string;
  connection_id: string;
  state: string;
};

class AgentService {
  constructor(private http: Axios) {}

  getConnections(): Promise<any> {
    return this.http
      .get("http://192.168.43.170:7011/connections", {})
      .then((e) => {
        console.log(e.status);
        return e.data;
      })
      .catch((e) => console.error(e));
  }

  receiveInvitation(payload: any): Promise<any> {
    return this.http
      .post(
        "http://192.168.43.170:7011/connections/receive-invitation",
        payload
      )
      .then((e) => {
        console.log(e.data);
        return e.data;
      })
      .catch((e) => console.error(e));
  }
}

export default AgentService;

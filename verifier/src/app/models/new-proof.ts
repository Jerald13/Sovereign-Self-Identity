export class NewProof {
    constructor() { }

    updateBodyPayLoadTemplate(comment, connectionID, requestName, credentialDefinitionId, requestedAttributes, requestedPredicates) {
        this.bodyPayloadTemplate.comment = comment;
        this.bodyPayloadTemplate.connection_id = connectionID;
        this.bodyPayloadTemplate.presentation_request.indy.name = requestName;
        this.bodyPayloadTemplate.presentation_request.indy.requested_attributes = requestedAttributes;
        this.bodyPayloadTemplate.presentation_request.indy.requested_predicates = requestedPredicates;
        return this;
    }

    bodyPayloadTemplate: any = {
        "comment": "",
        "connection_id": "",
        "presentation_request": {
          "indy": {
            "name": "",
            "version": "1.0",
            "requested_attributes": {},
            "requested_predicates": {}
          }
        },
        "trace": false
    }
}
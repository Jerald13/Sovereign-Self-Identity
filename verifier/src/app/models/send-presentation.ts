export class SendPresentation {
    constructor() {}

    updateBodyPayLoadTemplate(attributesObject, predicatesObject) {
        this.bodyPayloadTemplate.indy.requested_attributes = attributesObject;
        this.bodyPayloadTemplate.indy.requested_predicates = predicatesObject;
        return this;
    }

    bodyPayloadTemplate: any = {
        "indy": {
            "requested_predicates": {},
            "requested_attributes": {},
            "self_attested_attributes": {},
        }
    }
}
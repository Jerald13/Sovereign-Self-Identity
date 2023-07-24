export class SendOffer {
    constructor() {}

    updateBodyPayLoadTemplate(attributes, credDefID, issuerDID, schemaID, schemaIssuerDID, schemaName, schemaVersion) {
        this.bodyPayloadTemplate.counter_preview.attributes = Array.from(attributes);
        this.bodyPayloadTemplate.filter.indy.cred_def_id = credDefID;
        this.bodyPayloadTemplate.filter.indy.issuer_did = issuerDID;
        this.bodyPayloadTemplate.filter.indy.schema_id = schemaID;
        this.bodyPayloadTemplate.filter.indy.schema_issuer_did = schemaIssuerDID;
        this.bodyPayloadTemplate.filter.indy.schema_name = schemaName;
        this.bodyPayloadTemplate.filter.indy.schema_version = schemaVersion;
        return this.bodyPayloadTemplate;
    }

    bodyPayloadTemplate: any = {
        "counter_preview": {
            "@type": "issue-credential/2.0/credential-preview",
            "attributes": [

              ]
        },
        "filter": {
            "indy": {
                "cred_def_id": "",
                "issuer_did": "",
                "schema_id": "",
                "schema_issuer_did": "",
                "schema_name": "",
                "schema_version": ""
            }
        }
    }
}
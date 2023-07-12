export class NewCredentialRequest {
  newAttributeKeyValuePair: any = {};
  constructor() {
  }
  addNewAttributeKeyPair(schemaID, attributeName: string[], attributeValue: string[], connectionID, definitionID, comment) {
      //dynamically update values in the bodyPayloadTemplate
      this.bodyPayloadTemplate.filter.indy.schema_id = schemaID;
      this.bodyPayloadTemplate.filter.indy.schema_issuer_did = schemaID.split(':')[0];
      this.bodyPayloadTemplate.filter.indy.issuer_did = schemaID.split(':')[0];
      this.bodyPayloadTemplate.filter.indy.schema_name = schemaID.split(':')[2];
      this.bodyPayloadTemplate.filter.indy.schema_version = schemaID.split(':')[3];
      this.bodyPayloadTemplate.filter.indy.cred_def_id = definitionID;
      for (let i = 0; i < attributeName.length; i++) {
          this.attributePair = {};
          this.attributePair['name'] = attributeName[i];
          this.attributePair['value'] = attributeValue[i] ;
          this.bodyPayloadTemplate.credential_preview.attributes.push(this.attributePair);
      }
      this.bodyPayloadTemplate.connection_id = connectionID;
      this.bodyPayloadTemplate.comment = comment;
      return this;
  }

  bodyPayloadTemplate: any = {
      "auto_issue": true,
      "auto_remove": true,
      "comment": "",
      "connection_id": "",
      "credential_preview": {
          "@type": "issue-credential/2.0/credential-preview",
          "attributes": []
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
      },
      "trace": true
  };

  attributePair: any;
}
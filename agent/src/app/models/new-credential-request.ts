export class NewCredentialRequest {
    newAttributeKeyValuePair: any = {};
    constructor() {
    }
    addNewAttributeKeyPair(attributeName: string[], attributeValue: string[], connectionID, comment, name, ic) {
        //dynamically update values in the bodyPayloadTemplate
        for (let i = 0; i < attributeName.length; i++) {
            this.attributePair = {};
            this.attributePair['name'] = attributeName[i];
            this.attributePair['value'] = attributeValue[i];
            this.bodyPayloadTemplate.credential_preview.attributes.push(this.attributePair);
        }
        this.bodyPayloadTemplate.connection_id = connectionID;
        this.bodyPayloadTemplate.comment = comment;
        this.bodyPayloadTemplate.filter.ld_proof.credential.credentialSubject.name = name;
        this.bodyPayloadTemplate.filter.ld_proof.credential.credentialSubject.ic = ic;
        //TO DO
        //dynamically update values of other fields if needed
        return this;
    }

    bodyPayloadTemplate: any = {
        "auto_remove": true,
        "comment": "",
        "connection_id": "",
        "credential_preview": {
            "@type": "issue-credential/2.0/credential-preview",
            "attributes": []
        },
        "filter": {
            "indy": {},
            "ld_proof": {
                "credential": {
                  "@context": [
                    "https://www.w3.org/2018/credentials/v1"
                  ],
                  "credentialSubject": {
                    "name": "",
                    "ic": "",
                    "type": []            
                  },
                  "issuanceDate": "2022-01-01T00:00:00Z",
                  "issuer": "",
                  "type": [
                    "VerifiableCredential",
                    "ExWorker"
                  ]
                },
                "options": {
                  "proofType": "Ed25519Signature2018"
                }
              }
        },
        "trace": false
    };

    attributePair: any;
}
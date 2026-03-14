import {Builder} from 'xml2js';

export const buildSoapResponse = (operationType: string, payload) => {
    const builder = new Builder({headless: true})

    const soapStructure = {
        "soap:Envelope": {
            $: {"xmlns:soap": "https://schemas.xmlsoap.org/soap/envelope/"},
            "soap:Body": {
                 [operationType] : {
                    user: payload.map(u => ({
                        id: u?.id || 'undefined',
                        name: u.name || 'undefined',
                        email: u.email || 'undefined',
                        age: u.age || 'undefined'
                    }))
                }
            }
        }
    }
   const xml = builder.buildObject(soapStructure)
   return xml
}



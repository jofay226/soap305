import {Builder} from "xml2js"

export const errorResponseBuilder = () => {
       return (`
           <soap:Envelope xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <soap:Fault>
                    <faultCode>404</faultCode>
                    <faultString>fsdfdsfsdfdsfsd fsdjhg gjsdfh ghdfjs</faultString>
                </soap:Fault>
            </soap:Body>
        </soap:Envelope>
    `)
}


export const successResponseBuilder = (users) => {
    const builder = new Builder({headless: true})

    const soapResponse = {
        "soap:Envelope": {
            "$": {"xmlns:soap" : "https://schemas.xmlsoap.org/soap/envelope/"},
            "soap:Body":{
                "getUsersResponse": {
                    "user": users.map((u) => ({
                        id: u.id,
                        name: u.name
                    }))
                }
            }
        }
    }
    
    return builder.buildObject(soapResponse)
}
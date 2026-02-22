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


export const successResponseBuilder = () => {
    return (`
        <soap:Envelope xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <getUsersResponse>
                    <users>
                        <user>
                            <id>2</id>
                            <name>bob</name>
                        </user>
                        <user>
                            <id>2</id>
                            <name>bob</name>
                        </user>
                    </users>
                </getUsersResponse>
            </soap:Body>
        </soap:Envelope>
    `)



}
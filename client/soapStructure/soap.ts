

export const fetchAllUsersReq = {
    "soap:Envelope": {
        $: {"xmlns:soap": "https://schemas.xmlsoap.org/soap/envelope/"},
        "soap:Body": {
            "listUsersRequest": {}
        }
    }
}
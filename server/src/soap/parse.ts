import {parseStringPromise} from 'xml2js'


export const parseXml = async (xml: string) => {
    const parsedRequest = await parseStringPromise(xml)
    const body = parsedRequest['soap:Envelope']['soap:Body'][0]

    const operationType = Object.keys(body)[0]
    const payload = body[operationType]

    return {operationType, payload}
}







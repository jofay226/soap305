import {parseStringPromise} from 'xml2js'


export const parse = async (xml: string) => {
    const parsed = await parseStringPromise(xml)
    console.log(parsed);


    // return {operationType, payload}
}


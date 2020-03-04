/**
 * Created by Williams on 17/2/2020.
 */

const protocol = 'http'
const host = 'localhost'
const port = '80'
const nameBackSQL = 'ShopCar'
const nameServiceSQlForData = 'ForDataQuery'
const nameServiceSQlABM = 'ABMQuery'

export function ConfigServicesSQl (typeQuery = 'select') {
    let nameServiceSQl = nameServiceSQlForData
    if (typeQuery === 'insertar' || typeQuery === 'modificar' || typeQuery === 'eliminar') {
        nameServiceSQl = nameServiceSQlABM
    }
    return {
        protocol: protocol,
        host: host,
        port: port,
        nameService: nameBackSQL + '/' + nameServiceSQl + '/',
        timer: 60000
    }
}
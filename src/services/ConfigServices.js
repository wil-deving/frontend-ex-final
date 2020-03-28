/**
 * Created by Williams on 17/2/2020.
 */

const protocol = 'http'
const host = '192.168.0.105'
const port = '80'
const nameBackSQL = 'ShopCar'
const nameServiceSQlForData = 'ForDataQuery'
const nameServiceSQlABM = 'ABMQuery'
const nameServiceReport = 'Reports/LinksReports'

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

export function ConfigServicesReports () {
    return protocol + '://' + host + ':' + port + '/' + nameBackSQL + '/' + nameServiceReport + '/'
}
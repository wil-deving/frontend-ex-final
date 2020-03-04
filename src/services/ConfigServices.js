/**
 * Created by Williams on 17/2/2020.
 */

var protocol = 'http'
var host = 'localhost'
var port = '80'
var nameBackSQL = 'IASHanban'
var nameServiceSQl = 'QueriesExecute'

export const ConfigServicesSQl = {
    protocol: protocol,
    host: host,
    port: port,
    nameService: nameBackSQL + '/' + nameServiceSQl + '/',
    timer: 60000
}
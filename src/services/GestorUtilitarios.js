/**
 * Created by Williams on 21/3/2020.
 */
export function obtenerFechaHoraActual () {
    let date = new Date()
    let year = date.getFullYear()
    let mounth = date.getMonth()
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let currentDay = year + '-' + mounth + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    return currentDay
}
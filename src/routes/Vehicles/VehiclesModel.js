/**
 * Created by Williams on 8/3/2020.
 */
export default class Model {
    constructor () {

    }

    insertarRegistroVehiculo (datos = null) {
        let consulta = ' INSERT INTO vehicle (id_vehicle, id_sub_trademark, color, precio_unitario, placa, ' +
            ' chasis, anio) ' +
            ' VALUES ( ' +
            `'` + datos.idVehicle + `', ` +
            `'` + datos.idSubMarca + `', ` +
            `'` + datos.color + `', ` +
            datos.precioU + `, ` +
            `'` + datos.placa + `', ` +
            `'` + datos.chasis + `', ` +
            datos.anio + ' ) '
        return consulta
    }

    obtenerSubMarks () {
        let consulta = ' SELECT id_sub_trademark, name_sub_trademark ' +
            ' FROM subtrademark '
        return consulta
    }

    obtenerDataVehicles () {
        let consulta = ' SELECT V.id_vehicle, T.name_trademark, ST.name_sub_trademark, V.color, V.anio, ' +
            ' V.precio_unitario FROM vehicle V ' +
            ' INNER JOIN subtrademark ST ON (V.id_sub_trademark = ST.id_sub_trademark) ' +
            ' INNER JOIN trademark T ON (T.id_trademark = ST.id_trademark) '
        return consulta
    }
}
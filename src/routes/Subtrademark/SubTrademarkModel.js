/**
 * Created by Williams on 8/3/2020.
 */
export default class Model {
    constructor () {

    }

    obtenerListaMarcas () {
        let consulta = ' SELECT id_trademark, name_trademark FROM trademark '
        return consulta
    }

    obtenerListaSubMarcas () {
        let consulta = ' SELECT st.id_sub_trademark, t.id_trademark, t.name_trademark, st.name_sub_trademark, ' +
            ' st.capacidad, st.cilindrada ' +
            ' FROM subtrademark st ' +
            ' INNER JOIN trademark t ON (st.id_trademark = t.id_trademark)'
        return consulta
    }

    insertarRegistroMarca (data) {
        // console.log('insertarRegistroMarca', data)
        data.marca = parseInt(data.marca)
        data.capacidad = parseInt(data.capacidad)
        data.cilindros = data.cilindros + 'c.c.'
        let consulta = ' INSERT INTO subtrademark (id_sub_trademark, id_trademark, name_sub_trademark, capacidad,' +
            ' motor, cilindrada) ' +
            ' VALUES ( ' +
            `'` +  data.idSubMark + `', ` +
            data.marca + `, ` +
            `'` + data.nombre + `', ` +
            data.capacidad + `, ` +
            `'` + data.motor + `', ` +
            `'` + data.cilindros + `'` +
            ' ) '
        return consulta
    }
}
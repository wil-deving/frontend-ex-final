/**
 * Created by Williams on 26/3/2020.
 */
export default class Model {
    constructor () {

    }

    ObtenerPorCredito (tipo) {
        let consulta = ' SELECT T.name_trademark, ST.name_sub_trademark, V.anio, V.precio_unitario '
        if (tipo === 'credito') {
            consulta += ', Q.initial_amount, Q.time_loan, Q.month_amount'
        }
            consulta += ' FROM quote Q ' +
            ' INNER JOIN vehicle V ON V.id_vehicle = Q.id_vehicle ' +
            ' INNER JOIN subtrademark ST ON ST.id_sub_trademark = V.id_sub_trademark ' +
            ' INNER JOIN trademark T ON T.id_trademark = ST.id_trademark '
        if (tipo === 'credito') {
            consulta += ' WHERE Q.type = ' + `'` + 'Credito' + `'`
        } else if (tipo === 'contado') {
            consulta += ' WHERE Q.type = ' + `'` + 'Contado' + `'`
        }
        return consulta
    }

    ArmarConsulta () {
        let consulta = ''
        return consulta
    }
}
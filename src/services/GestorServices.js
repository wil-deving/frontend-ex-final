/**
 * Created by Williams on 17/2/2020.
 */
import $ from 'jquery'


import { ConfigServicesSQl } from './ConfigServices.js'

export default class GestorServices {

    constructor() {

    }

    testingAjaxRequest () {
        let urlReq = this.buildUrlServiceSQL()
        var parametros = { //cada par�metro se pasa con un nombre en un array asociativo
            "sql": 'SELECT * FROM vehicle'
        }
        return new Promise(function (resolve, reject) {

            /*$.ajax({
                data: parametros,//los parametros se pasan poresta variable
                url: urlReq,
                type: 'post',
                beforeSend: function () {//elemento que queramos poner mientras ajax carga
                    //$("#resultado").html("Procesando, espere por favor...");
                },
                success: function (response) {//resultado de la funci�n
                    //$("#resultado").html(response);
                    console.log('WWWW', response)
                    resolve({
                        Correcto: true,
                        mensaje: 'Respuesta a la promesa',
                        listaResultado: response
                    })
                },
                error: function (xhr, status) {
                    //console.log('Algo salio mal', xhr, 'State: ', status)
                },
                complete : function(xhr, status) {
                    console.log('Se hizo la peticion para bien o para mal', xhr, 'State: ', status)
                }
            });*/
        })
    }

    ExecuteSimpleQuery (Consulta = '', type = 'select') {
        let urlReq = this.buildUrlServiceSQL(type)
        var parametros = { //cada par�metro se pasa con un nombre en un array asociativo
            "sql": Consulta
        }
        return new Promise(function (resolve, reject) {

           /* $.ajax({
                data: parametros,//los parametros se pasan poresta variable
                url: urlReq,
                type: 'post',
                beforeSend: function () {
                    //elemento que queramos poner mientras ajax carga
                },
                success: function (response) {//resultado de la funci�n
                    // Esta parte se ejecuta si se hizo una correcta perticion a l back, y
                    // valida asi el funcionamiento correcto del back
                    // console.log('RespAjax', response)
                    resolve(response)
                },
                error: function (xhr, status) {
                    // Esto se ejecuta si se hizo una incorrecta peticion al back
                    console.log('Algo salio mal', xhr, 'State: ', status)
                },
                complete : function(xhr, status) {
                    // Esto se ejecuta ya se haya realizado por success o por error en la
                    // respuesta a la peticion.
                    // console.log('Se hizo la peticion para bien o para mal', xhr, 'State: ', status)
                }
            });*/
        })
    }

    // Funcion que arma la URL del backend que se consumira
    buildUrlServiceSQL (type = 'select') {
        //let configServicesSQl = ConfigServicesSQl(type)
        //return configServicesSQl.URL
    }

}
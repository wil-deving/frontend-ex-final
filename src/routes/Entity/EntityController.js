import { API_SERVICES } from './../../services/ConfigServices'

var uuid = require('uuid')

/*
export function GUARDAR (val = '') {

    let id = uuid.v4()

    const apiEntity = API_SERVICES + 'v1/health'

    return new Promise((resolve, reject) => {

        fetch(apiEntity).then(function(response) {
            console.log("Willl", response)
            resolve({
                mensaje: "Wiiii"
            })
        })
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });

        
    })
}
*/

export async function GUARDAR (val = '') {

    const response = await fetch(`${API_SERVICES}/v1/entities`, {
        method: "GET",
        /*body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",*/
      });
      console.log("IIIIIIIIIII", response)
      const body = await response.json();
      console.log("TTTTTTT", body)
      //return { status: response.status, body };
}
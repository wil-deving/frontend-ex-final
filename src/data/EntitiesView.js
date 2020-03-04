/**
 * Created by Williams on 3/3/2020.
 */
let EntitiesView = {
    Horarios: {
        Dias: {
            tagComponent: 'Seleccione los dias en que se aplicara los horarios',
            daysList: [
                { tag: 'Lunes', value: 'Lunes', activo: true },
                { tag: 'Martes', value: 'Martes' },
                { tag: 'Miercoles', value: 'Miercoles' },
                { tag: 'Jueves', value: 'Jueves' },
                { tag: 'Viernes', value: 'Viernes' },
                { tag: 'Sabado', value: 'Sabado' }
            ]
        }
    }
}

export function obtenerEntidadForView (EntidadSecc) {
        // Obtiene un objeto clonado de la entidad que se necesita
        let objetoEntityView = Object.assign({}, EntitiesView[EntidadSecc])
        return objetoEntityView
}
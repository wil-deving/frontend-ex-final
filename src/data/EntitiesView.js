/**
 * Created by Williams on 3/3/2020.
 */
let EntitiesView = {
    SeccionMarcas: {
        TituloSeccion: 'Seccion Marcas',
        listaMarcas: {
            tagComponent: 'Seleccione una marca',
            optionsList: []
        },
        NombreMarca: {
            tagComponent: 'Nombre',
            placeholder: 'Nombre...',
            isRequired: true
        },
        Capacidad: {
            tagComponent: 'Capacidad',
            tagValue: 'personas',
            defaultValue: 5
        },
        Motor: {
            tagComponent: 'Motor',
            placeholder: 'Motor...',
            isRequired: true
        },
        Cilindrada: {
            tagComponent: 'Cilindrada',
            tagValue: 'c.c.',
            defaultValue: 1500
        },
        btnGuardar: {
            texto: 'Guardar',
            type: 'primary'
        },
        btnCancelar: {
            texto: 'Cancelar',
            type: 'danger'
        },
        tableSubMarcas: {
            tagComponent: 'Lista de marcas y modelos',
            head: [
                'Id Marca', 'Nombre marca', 'Nombre modelo', '# pasajeros', 'Cilindrada'
            ],
            data: []
        }
    }
}

export function obtenerEntidadForView (EntidadSecc) {
        // Obtiene un objeto clonado de la entidad que se necesita
        let objetoEntityView = Object.assign({}, EntitiesView[EntidadSecc])
        return objetoEntityView
}
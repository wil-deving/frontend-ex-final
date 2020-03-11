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
    },
    SeccionVehiculos: {
        TituloSeccion: 'Seccion Vehiculos',
        listaSubMarcas: {
            tagComponent: 'Seleccione un modelo',
            optionsList: []
        },
        listaColores: {
            tagComponent: 'Seleccione un color',
            optionsList: [
                { value: 'Rojo', name: 'Rojo', tag: 'Rojo' },
                { value: 'Azul', name: 'Azul', tag: 'Azul' },
                { value: 'Verde claro', name: 'Verde claro', tag: 'Verde claro' },
                { value: 'Verde Oscuro', name: 'Verde Oscuro', tag: 'Verde Oscuro' },
                { value: 'Negro', name: 'Negro', tag: 'Negro' },
                { value: 'Blanco', name: 'Blanco', tag: 'Blanco' },
                { value: 'Gris', name: 'Gris', tag: 'Gris' },
                { value: 'Beige', name: 'Beige', tag: 'Beige' },
                { value: 'Cafe', name: 'Cafe', tag: 'Cafe' }
            ]
        },
        PrecioUnitario: {
            tagComponent: 'Precio Unitario',
            tagValue: 'Dolares americanos',
            defaultValue: 20000
        },
        PlacaControl: {
            tagComponent: 'Placa de Control',
            placeholder: 'Placa de Control...',
            isRequired: true
        },
        Chasis: {
            tagComponent: 'Serie de Chasis',
            placeholder: 'Serie de Chasis...',
            isRequired: true
        },
        AnioModelo: {
            tagComponent: 'A\u00F1o de Modelo',
            tagValue: '',
            defaultValue: 2020
        },
        btnGuardarVehicle: {
            texto: 'Guardar',
            type: 'success'
        },
        btnCancelarVehicle: {
            texto: 'Cancelar',
            type: 'danger'
        },
        tableVehiculos: {
            tagComponent: 'Lista de Vehiculos',
            head: [
                'Nombre marca', 'Nombre modelo', 'Color', 'A\u00F1o', 'Precio $US'
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
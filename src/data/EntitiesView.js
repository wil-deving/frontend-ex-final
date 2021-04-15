/**
 * Created by Williams on 3/3/2020.
 */
const EntitiesView = {};

export function obtenerEntidadForView(EntidadSecc) {
  // Obtiene un objeto clonado de la entidad que se necesita
  let objetoEntityView = Object.assign({}, EntitiesView[EntidadSecc]);
  return objetoEntityView;
}

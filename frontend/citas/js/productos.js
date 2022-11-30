const url = 'http://localhost:8080/api/productos'
const cuerpoTabla = document.querySelector('tbody')
let resultados = ''

const modalProductos = new bootstrap.Modal(document.getElementById('modalProductos'))
const formulario = document.querySelector('form')
let opcion = ''

//mostrar todos los registros de la tabla productos
const urlListadoProductos = `${url}/todos`
fetch(urlListadoProductos)
    .then(response => response.json())
    .then(data => mostrarRegistros(data))
    .catch(error => console.log(error))

//armar el cuerpo de la tabla
const mostrarRegistros = (arreglo) => {
    arreglo.forEach(elemento => {
        resultados += ` <tr>
                                <td class="text-center">${elemento.idProducto}</td>
                                <td class="text-center">${elemento.idCategoria.nombreCategoria}</td>
                                <td>${elemento.nombreProducto}</td>
                                <td class="text-center">${elemento.referenciaProducto}</td>
                                <td class="text-end">${elemento.precioCostoProducto}</td>
                                <td class="text-end">${elemento.precioVentaProducto}</td>
                                <td class="text-center">${elemento.cantidadProducto}</td>
                                <td class="text-center">
                                    <a class="btnEditar btn btn-primary btn-sm"> Editar</a>
                                    <a class="btnBorrar btn btn-danger btn-sm"> Borrar</a>
                                </td>
                            </tr>
                            `
    });
    cuerpoTabla.innerHTML = resultados;
}

//escuchador de eventos
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

//procedimiento para eliminar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const idProducto = fila.firstElementChild.innerHTML

    alertify.confirm("¿Desear eliminar el registro?",
        function () {
            const urlBorrar = `${url}/borrar/${idProducto}`
            fetch(urlBorrar, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(() => location.reload())
            alertify.success('Ok');
        },
        function () {
            alertify.error('Cancelar');
        });
})

const comboCategorias = () => {
    const urlListadoCategorias = 'http://localhost:8080/api/categorias/todas'
    fetch(urlListadoCategorias)
        .then(response => response.json())
        .then(data => cargarOpcionesCombo(data))
        .catch(error => console.log(error))
}

const cargarOpcionesCombo = (arreglo) => {
    const comboCategoriasCuerpo = document.getElementById('idcategoria')
    let resultadosCombo = ''
    arreglo.forEach(elemento => {
        resultadosCombo += `<option value="${elemento.idCategoria}">${elemento.nombreCategoria}</option>`
    });
    comboCategoriasCuerpo.innerHTML = resultadosCombo
}

//abrimos ventana flotante para crear
btnCrear.addEventListener('click', () => {
    modalProductos.show()
    opcion = 'crear'
    comboCategorias()
})

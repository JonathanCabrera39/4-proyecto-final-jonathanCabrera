let productos = [];

let formulario
let inputNombre
let inputPrecioComprar
let inputColor
let inputCantidad
let tabla
let errores

class Producto {
    constructor(nombre,precioCompra,Color,cantidad){
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.Color = Color;
        this.cantidad = cantidad;
    }
}

function inicilizarElementos(){
    formulario = document.getElementById("formulario");
    inputNombre = document.getElementById("nombre")
    inputPrecioComprar = document.getElementById("precioCompra")
    inputColor = document.getElementById("Color")
    inputCantidad = document.getElementById("cantidad")
    tabla = document.getElementById("tablaProductos")
    errores= document.querySelector(".errores")
    errores.style.display = "none"
}

inicilizarElementos()


formulario.onsubmit = (event) =>{
    event.preventDefault();
    
    let nuevoProducto = new Producto(inputNombre.value,inputPrecioComprar.value,inputColor.value,inputCantidad.value)
    if(inputNombre.value != "" && inputColor.value != "" && inputCantidad.value != "" && inputPrecioComprar.value != ""){
       productos.unshift(nuevoProducto)
       limpiarTabla();    
       agregarProductosTabla()
       errores.style.display = "none"
       formulario.reset()
    }else{
        errores.style.display = "block"
    }
}

function limpiarTabla() {
    while(tabla.rows.length > 1) {
        tabla.deleteRow(1)
    }
}

function agregarProductosTabla() {
    productos.forEach(element => {
        let tabla = document.querySelector(".tabla")
        let filaTabla = document.createElement("tr")
        filaTabla.innerHTML=`
        <td>${element.nombre}</td>
        <td>${element.precioCompra}</td>
        <td>${element.Color}</td>
        <td>${element.cantidad}</td>
        `
        tabla.append(filaTabla)
    });
}

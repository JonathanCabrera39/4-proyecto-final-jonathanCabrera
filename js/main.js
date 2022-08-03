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
        let tabla = document.querySelector("#selecionar-producto")
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
//----------------------------------------------------------------
let ropa = [
    {id:100, nombre:"Sportswear",precio:200},
    {id:101, nombre:"Nsw Photo Tee",precio:180},
    {id:102, nombre:"ordan Stencil Crew",precio:100},
    {id:103, nombre:"verace logo",precio:100},
    {id:103, nombre:"MEDUSA BIGGIE",precio:70},
    {id:104, nombre:"couture t-shit",precio:122},
    ];

// let color = [
//     {red:"red", },
//     {verde:"verde",},
//     {azul:"azul"},
//     {violeta:"violeta"},
//     {amarrillo:"amarrillo"},
//     {negro:"negro"},
//     ];

  // function selecionarColor(){
    //     let aux = "";
    //     for(let i=0;i<color.length;i++){
    //         aux =
    //         aux +
    //         `
    //         <article  style= " border: 1px solid red">
    //         <button id="" onclick="({id: ${color[i].red}})">${red}</button>
    //         <button id="" onclick="({id: ${color[i].verde}})">${verde}</button>
    //         <button id="" onclick="({id: ${color[i].amarrillo}})">${amarrillo}</button>
    //         <button id="" onclick="({id: ${color[i].azul}})">${azul}</button>
    //         <button id="" onclick="({id: ${color[i].violeta}})">${violeta}</button>
    //         <button id="" onclick="({id: ${color[i].negro}})">${negro}</button>
    //         </article>
    //         `;
    //     }
    //     // console.log(aux);
    //     document.getElementById("selecionar-color").innerHTML = aux;
    // }
    
    function meterAlCarro(ObjetoProducto){
        //console.log(productosEnCarro)
        productosEnCarro.push(ObjetoProducto);
        localStorage.setItem("productosEnCarro", JSON.stringify(productosEnCarro));
        agregarProductosTabla();
}
function borrarDelCarro(id){
    //productosEnCarro.filter((item => item.id != id));
    productosEnCarro.splice(id,1)
    localStorage.setItem("productosEnCarro", JSON.stringify(productosEnCarro));
    agregarProductosTabla()
}

let productosEnCarro;

function pintarListado(){
    let aux = "";
    for(let i=0;i<ropa.length;i++){
        aux =
        aux +`
        <article  style= " border: 1px solid red">
        <h3>nombre: ${ropa[i].nombre}</h3>
        <p>$: ${ropa[i].precio}</p>
        <p>id: ${ropa[i].id}</p>
        <button id="meterAlCarro" onclick="meterAlCarro({id: ${ropa[i].id},nombre: '${ropa[i].nombre}',precio: ${ropa[i].precio}})">agrerar al carro</button>
        </article>
        `;
    }
    // console.log(aux);
    document.getElementById("selecionar-producto").innerHTML = aux;
}
pintarListado()


let aux = localStorage.getItem("productosEnCarro");

productosEnCarro = (JSON.parse(aux.toString()) || [])
agregarProductosTabla()

// if (!aux) {
//     productosEnCarro = [];
// }else{
    //    productosEnCarro = JSON.parse(aux.toString())
    //    agregarProductosTabla()
    // }
    
    function agregarProductosTabla() {
        let aux = "";
        for(let i=0;i<productosEnCarro.length;i++){
            aux =
            aux +`
            <tr style="border: 1px solid green">
            
            <td>${productosEnCarro[i].nombre}</td>
            <td>$: ${productosEnCarro[i].precio}</td>
            <td>id: ${productosEnCarro[i].id}</td>
            <td>id: ${productosEnCarro[i].id}</td>
            <td><button id="borrarDelCarro" onclick="borrarDelCarro(${[i]})" style="cursor:pointer;">🗑️</button></td>
            </tr>
            `;
        }
        document.getElementById("tablaxl-Productos").innerHTML = aux;
    }
    
    selecionarColor()
    //------------------------------------------------------------------------------

// const btn = document.querySelector("#meterAlCarro")
// btn.addEventListener('click', () => {
    //     Swal.fire({
        //         title: 'Genial!',
        //         text: 'Agregaste un producto al carro!',
        //         icon: 'success',
        //         confirmButtonText: 'Cool'
        // })
        // });


// const btn2 = document.querySelector('#borrarDelCarro')
// btn2.addEventListener('click', () => {

//     Swal.fire({
//         title: 'eliminaste!',
//         text: 'Borraste un producto al carro!',
//         icon: 'success',
//         confirmButtonText: 'Cool'
// })
// })


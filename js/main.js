let color = ['ROJA','NEGRA','AZUL'];
let talle = ['S','M','L','XL','XXL'];
let remera = 'color de la remera es: '

class Producto {
    constructor(id,nombre,categoria, precio,) {
        this.id  = id;
        this.nombre = nombre;
        this.categoria = categoria
        this.precio  = parseFloat(precio);
    }
    mostrarProducto(){
        return 'id:' +
        this.id +
        "precio: " +
        this.precio +
        " "+
        "producto; " +
        this.nombre +
        "\n";
    }
}
function comprar(nombre ,email ,tel ,productoParaCarro){
    let cant =  productoParaCarro.reduce((acc, item) => item.precio + acc,0 );
    alert ("gracias " + nombre + "por tu comprar. \n total: $ "+ cant );
}

let productos = [
    new Producto(101,"nike", "Sportswear",110),
    new Producto(102,"nike", "Nsw Photo Tee",210),
    new Producto(103,"nike", "Jordan Stencil Crew",180),
    new Producto(104,"versace", "verace logo",212),
    new Producto(105,"versace", "MEDUSA BIGGIE",312),
    new Producto(106,"versace", "couture t-shit",122),
    new Producto(107,"dior", "CACTUS JACK",115),
    new Producto(108,"dior", "POLO “CD ICON”",151),
    new Producto(109,"dior", "CORTE CASUAL",170),
];

let categorias = [ "deportivo",'fiesta']

let productosEnCarro = [];

let categoria = '';

const toDoList = []


while (categoria !="salir" && categoria != null){
    let aux = categorias.join( " , ");
    categoria = prompt ("ingrese una categoria o ingrese 'salir': \n(" + aux + ")" );
    
    console.log(categoria )
    if(categoria != 'salir' && categoria != null){
        let productosFiltradoPorCategoria = productos.filter(
            (item) =>(item.categoria = categoria)
            );
            let strAUX = "";
            for(let i = 0 ; i < productosFiltradoPorCategoria.length; i++){
                strAUX += productosFiltradoPorCategoria[i].mostrarProducto();
            }
            let idSeleccionado =  parseInt(
                prompt('seleccione id del producto que quiere comprar: \n\n' + strAUX
                )
                ); 
                
                let productoParaCarro = productosFiltradoPorCategoria.find(
                    (item)=> item.id == idSeleccionado);
                    
                    if(productoParaCarro){
                        productosEnCarro.push(productoParaCarro); 
                        console.log(productosEnCarro)
                        
                }
            }
            if(categoria != 'salir' && categoria != null){
                let selecColor = prompt("seleccione color (1-roja) (2-negra) (3-azul)");
                if(selecColor == "1"){
                    console.log(`${remera}${color[0]}`)
                }else if(selecColor == '2'){
                    console.log(`${remera}${color[1]}`)
                }else if (selecColor == '3'){
                    console.log(`${remera}${color[2]}`)
                }else {
                    console.log("no eligio color") 
                }
                let selecTalle = prompt("seleccionar talle (1-S) (2-M) (3-L) (4-XL) (5-XXL)")
                if(selecTalle == "1"){
                    console.log(`TALLE: ${talle[0]}`)
                }else if(selecTalle == '2'){
                    console.log(`TALLE: ${talle[1]}`)
                }else if (selecTalle == '3'){
                    console.log(`TALLE: ${talle[2]}`)
                }else if(selecTalle == '4'){
                    console.log(`TALLE: ${talle[1]}`)
                }else if (selecTalle == '5'){
                    console.log(`TALLE: ${talle[2]}`)
                }else {
                    console.log("no eligio talle") 
                }
                toDoList.push(selecTalle);
            }
           
        }
       if (productosEnCarro.length > 0){
            alert("ingrese sus datos para terminar su comprar");
            let nombre = prompt("ingrese su nombre");
            let email = prompt("ingrese su email");
            let tel = prompt("ingrese su tel");
            comprar(nombre,email,tel,productosEnCarro)
       }



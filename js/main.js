const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.querySelector(".menu-btn").addEventListener("click", () => {
document.querySelector(".menu").classList.toggle("show");
  });

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', e => { 
  fetchData()
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    pintarCarrito()
}
 });
cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

// Traer productos
const fetchData = async () => {
    const res = await fetch('data.json');
    const data = await res.json()
    // console.log(data)
    pintarCards(data)
}

// Pintar productos
const pintarCards = data => {
    data.forEach(item => {
        templateCard.querySelector('h5').textContent = item.nombre
        templateCard.querySelector('p').textContent = item.precio
        templateCard.querySelector('img').setAttribute("src",item.img)
        templateCard.querySelector('button').dataset.id = item.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

// Agregar al carrito
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        // console.log(e.target.dataset.id)
        // console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = item => {
    // console.log(item)
    const producto = {
        nombre: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }
    // console.log(producto)
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }
    
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

(async () =>{
    const {value: pais} = await Swal.fire({
        title: 'bienvenido!',
        text: 'difruta de nuetros productos!',
        html:"<h1> seleccione su pais</h1>",
        //icon: 'success',
        confirmButtonText: 'selecionar',
        footer:'<span class="colores"> esta infomacion es importante </span>',
        width:'90%',
        padding: '1rem',
        background: 'var(--purpledark)',
        color: 'var(--whiter)',

        //grow:'column'
        backdrop: 'true',
        timer:2*5000,
        timerProgressBar: 'auto',
       
        //toast:'true',
        position:'center',
        allowOutsideClick:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        stopKeydownPropagation:false,
    
        input:'select',
        inputPlaceholder:'pais',
        inputValue:'',
        inputOptions:{
            mexico:'mexico',
            españa:'españa',
            argentina:'argentina',
        },
        
          //customClass:{
  	        // container:
        	//popup:"popup-class",
        	// header:
        	// title:
        	// closeButton:
        	// icon:
        	// image:
        	// content:
        	// input:
        	// actions:
        	// confirmButton:
        	// cancelButton:
        	// footer:
          //}
      	
    
        showConfirmButton:'var(--purpledark)',
        confirmButtonColor:'var(--purpledark)',
        confirmButtonAriaLabel:'var(--purpledark)',
    
        // showCancelButton:
        // cancelButtonText:
        // cancelButtonColor:
        // cancelButtonAriaLabel:
        
        // buttonsStyling:
        // showCloseButton:
        // closeButtonAriaLabel:
    
    
        // imageUrl:
        // imageWidth:
        // imageHeight:
        // imageAlt:
    });

    if(pais){
        Swal.fire({
            title: `seleccionaste ${pais}`,
            background: 'var(--purpledark)',
            color: 'var(--whiter)',
            confirmButtonColor:'var(--purpledark)',
            confirmButtonAriaLabel:'var(--purpledark)',
           
        });
    }else{
        Swal.fire({
            title: `sele acabo el tiempo`,
        footer:'<span class="colores"> actualize la pagina para seleccionar su pais </span>',
        background: 'var(--purpledark)',
        color: 'var(--whiter)',
        confirmButtonColor:'var(--purpledark)',
        confirmButtonAriaLabel:'var(--purpledark)',


        }); 
    }
})()
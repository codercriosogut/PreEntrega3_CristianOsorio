


class Item{
  constructor(item){
    this.nombre = item.nombre;
    this.precio = item.precio;
    this.descripcion = item.descripcion;
  }
  assemble(){
    console.log(this.nombre)
    return `<div class="card-header py-3">
            <h4 class="my-0 fw-normal">${this.nombre}</h4>
            </div>
            <div class="card-body">
            <h1 class="card-title pricing-card-title">$${this.precio}</h1>
            <p><p><p><p>
            ${this.descripcion}
            </p>
            <button nombre="button" id="eventoCompra" class="w-100 btn btn-lg btn-outline-primary" onclick="buyPlan('${this.nombre}', '${this.precio}', '${this.descripcion}')">Comprar</button>
            </div>`;
  }
}


//error
/*
let eventoCompra = document.getElementById("eventoCompra");
eventoCompra.addEventListener('click', () => {
  Toastify({
    text: "This is a toast",
    duration: 3000,
    gravity: 'bottom',
    position: 'left'
  }).showToast();
})
*/



// Datos de la compra del item
let mensaje = document.getElementById("mensaje");
// formulario
let FormProduc = document.getElementById("FormProduc");
// Seccion de todos los productos
let totalProduc = document.getElementById("totalProduc");
FormProduc.addEventListener("submit",crearProduc);
// Variable Global
let listaProduc;
let stotageList;
// falsy
listaProduc = JSON.parse(localStorage.getItem("listaProduc")) || [];
const cards = document.getElementById("cards");
const checkoutButton = document.getElementById("checkoutButton");


function buyPlan(nombre, precio, descripcion) {
  const cartItem = document.createElement("li");
  cartItem.innerHTML = `${nombre} - $${precio}`;
  cards.appendChild(cartItem);
  //guardar informacion a la estructura de datos
  const comprasUsers = JSON.parse(localStorage.getItem("comprasUsers")) || [];
  comprasUsers.push({ nombre, precio });
  localStorage.setItem("comprasUsers", JSON.stringify(comprasUsers));
  mensaje.append(messageBody);
  mensaje.className = "alert alert-success visible";
}



//ARREGLADO
checkoutButton.addEventListener("click", () => {
  // Implementa la lógica para procesar el pedido aquí
  // Puedes acceder a los elementos del carrito desde localStorage
  const comprasUsers = JSON.parse(localStorage.getItem("comprasUsers")) || [];
  if (comprasUsers.length === 0) {
    //alert("El carrito está vacío. Agrega planes antes de realizar el pedido.");
    //alerta sweetalert
    Swal.fire( {
      icon: 'error',
      title: '¡Error!',
      text: 'El carrito esta vacío!',
      footer: '<a>Favor agrega nuevos productos al carro de compras.</a>'
    })
  } else {
    localStorage.removeItem("comprasUsers");
    cards.innerHTML = "";
    //alerta sweetalert
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El pedido se ha realizado con éxito!',
      showConfirmButton: false,
      timer: 2000
    })
    // Realiza la lógica para procesar el pedido, por ejemplo, enviar los datos al servidor, etc.
    //    alert("Pedido realizado con éxito");
    // Limpia el carrito después de realizar el pedido

  }
});


const verProductos = ()=>{
  let stotaged = listaProduc;
  stotageList = [];
  totalProduc.innerHTML = "";
  for(const objeto of stotaged){
    console.log(objeto);
    stotageList.push(new Item(objeto));
  }
  console.log(stotageList);
  for(const item of stotageList){
    let firstDiv = document.createElement("div");
    firstDiv.className="col";
    let secondDiv = document.createElement("div");
    secondDiv.className ="card mb-4 rounded-3 shadow-sm";
    secondDiv.innerHTML = item.assemble();
    firstDiv.append(secondDiv);
    totalProduc.append(firstDiv)
  }
}
//agrega nuevo item al storage
/**
*@param {Object} item 
*/


const nuevoProduc = (item) =>{
  //console.log(item)
  listaProduc.push(item);
  //console.log(listaProduc)
  localStorage.setItem("listaProduc", JSON.stringify(listaProduc));
  verProductos();
  //borrar contenido al agregar nuevo producto al inventario
  tipoProduc.value = "";
  tipoPrecio.value = "";
  tipoDescripcion.value = "";
  //Mensaje producto guardado
  Swal.fire({
    title: '¡Producto guardado con Éxito!',
    text: 'Los campos llenos se borrarán',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}
/**
 * Recibe los datos del formulario para la creación 
 * del nuevo Item.
 * @param {Object} e 
 */


function crearProduc(e){
  // Inputs
  let tipoProduc = document.getElementById("tipoProduc").value;
  let tipoPrecio = document.getElementById("tipoPrecio").value;
  let tipoDescripcion = document.getElementById("tipoDescripcion").value;
  e.preventDefault();
  let item = {
    nombre: tipoProduc,
    precio: tipoPrecio,
    descripcion: tipoDescripcion
  }
  nuevoProduc(item);
}

// Función para borrar todo el contenido del localStorage
function clearLocalStorage() {
  localStorage.clear();
  totalProduc.innerHTML = "";
  location.reload();
  // También puedes agregar un mensaje de confirmación si lo deseas
  alert("El contenido del localStorage se ha borrado correctamente.");
}
// Puedes agregar un evento para llamar a esta función cuando sea necesario
// Por ejemplo, puedes agregar un botón en tu HTML y vincularlo a esta función
document.getElementById("clearLocalStorageButton").addEventListener("click", clearLocalStorage);

/*
const clearLocalStorageButton = document.getElementById("clearLocalStorageButton");
clearLocalStorageButton.addEventListener("click", clearLocalStorage);
*/




verProductos();

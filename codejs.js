class Plan{
    constructor(plan){
        this.type = plan.type;
        this.price = plan.price;
        this.description = plan.description;
    }
    assemble(){
        console.log(this.type)
        return ` <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">${this.type}</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">$${this.price}</h1>
                    <p><p><p><p>
                    ${this.description}
                    </p>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" onclick="buyPlan('${this.type}', '${this.price}', '${this.description}')">Comprar</button>
                </div>`;
                
    }
}
// Datos de la compra del plan
let message = document.getElementById("message");
// formulario
let formPlan = document.getElementById("formPlan");
// Seccion de todos los planes
let allPlans = document.getElementById("allPlans");
formPlan.addEventListener("submit",createPlan);
// Variable Global
let planList;
let stotageList;
// falsy
planList = JSON.parse(localStorage.getItem("planList")) || [];
const cartItems = document.getElementById("cartItems");
const checkoutButton = document.getElementById("checkoutButton");

function buyPlan(type, price, description) {
  const cartItem = document.createElement("li");
  cartItem.innerHTML = `${type} - $${price}`;
  cartItems.appendChild(cartItem);

  // Guardar la información en una estructura de datos
  // Puedes usar un array para mantener un seguimiento de los elementos en el carrito
  // Por ejemplo:
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ type, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  message.append(messageBody);
  message.className = "alert alert-success visible";
}

checkoutButton.addEventListener("click", () => {
  // Implementa la lógica para procesar el pedido aquí
  // Puedes acceder a los elementos del carrito desde localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
//alert("El carrito está vacío. Agrega planes antes de realizar el pedido.");



//alerta sweetalert
Swal.fire({
  icon: 'error',
  title: '¡Error!',
  text: 'El carrito esta vacío!',
  footer: '<a>Favor agrega nuevos productos al carro de compras.</a>'
})
  } else {


//alerta sweetalert
Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'El pedido se ha realizado con éxito!',
  showConfirmButton: false,
  timer: 5000
})
// Realiza la lógica para procesar el pedido, por ejemplo, enviar los datos al servidor, etc.
//    alert("Pedido realizado con éxito");
// Limpia el carrito después de realizar el pedido
    localStorage.removeItem("cart");
    cartItems.innerHTML = "";
  }
});

const showPlans = ()=>{
    let stotaged = planList;
    stotageList = [];
    allPlans.innerHTML = "";

    for(const objeto of stotaged){
        console.log(objeto);
        stotageList.push(new Plan(objeto));
    }
    console.log(stotageList);

    for(const plan of stotageList){
        let firstDiv = document.createElement("div");
        firstDiv.className="col";
        let secondDiv = document.createElement("div");
        secondDiv.className ="card mb-4 rounded-3 shadow-sm";
        /*secondDiv.innerHTML =` <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">${plan.type}</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">$${plan.price}<small class="text-muted fw-light">/mo</small></h1>
                    <p>
                    ${plan.description}
                    </p>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Comprar Plan</button>
                </div>`;*/
        secondDiv.innerHTML = plan.assemble();
        firstDiv.append(secondDiv);
        allPlans.append(firstDiv)
    }
  
}

/**
 * Agrega un nuevo plan al Storage
 * @param {Object} plan 
 */
const newPlan = (plan) =>{
   //console.log(plan)
   planList.push(plan);
   //console.log(planList)
   localStorage.setItem("planList", JSON.stringify(planList));
   showPlans();
}

/**
 * Recibe los datos del formulario para la creación 
 * del nuevo Plan.
 * @param {Object} e 
 */
function createPlan(e){
   // Inputs
    let planType = document.getElementById("planType").value;
    let planPrice = document.getElementById("planPrice").value;
    let planDescription = document.getElementById("planDescription").value;

    e.preventDefault();

    let plan = {
        type: planType,
        price: planPrice,
        description: planDescription
    }

    newPlan(plan);
}
showPlans();
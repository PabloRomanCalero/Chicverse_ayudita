let token = document.querySelector('[name=_token]').value;

async function mostrarProducto() {
    const productContainer = document.getElementById('product-container');
    const productId = productContainer.getAttribute('data-product-id');

    let productsData = await fetch(`/api/product/${productId}`);
    let product = await productsData.json();

    console.log(product);
    let imageProducts = await fetch(`/api/image/product/${productId}`);
    let imageProductJson = await imageProducts.json();
    let imageProduct = imageProductJson[0]; 

    let productDiv = document.createElement('div');
    productDiv.classList.add('product');

    let productImg = document.createElement('img');
    productImg.src = '/' + imageProduct.url;
    productImg.alt = product.name;

    let productName = document.createElement('h2');
    productName.textContent = product.name;
    
    let productMarca = document.createElement('h4');
    productMarca.textContent = product.brand;
    
    let productTalla = document.createElement('label');
    productTalla.textContent = 'Talla: ';
    
    let selectTalla = document.createElement('select');
    selectTalla.classList.add('selectTalla');

    let opcionesTalla = product.category === "Zapatillas" ? [36, 38, 40, 42, 44] : ["XS", "S", "M", "L", "XL"];

    opcionesTalla.forEach(talla => {
        let option = document.createElement('option');
        option.value = talla;
        option.textContent = talla;
        selectTalla.appendChild(option);
    });
    productTalla.appendChild(selectTalla);
    
    let productPrice = document.createElement('p');
    productPrice.textContent = 'Precio: ' + product.price + '€';

    let stockTalla = await getStockTalla();
    let inputCantidad = document.createElement('input');
    inputCantidad.classList.add('inputCantidad');
    inputCantidad.type = 'number';
    inputCantidad.min = 1;
    inputCantidad.max = stockTalla.stock;

    if (stockTalla.stock < 1) {
        inputCantidad.disabled = true; 
        inputCantidad.value = 0;
    } else {
        inputCantidad.disabled = false;
        inputCantidad.value = 1;
    }

    selectTalla.addEventListener('change', async function() {
        let stockTalla = await getStockTalla();
        inputCantidad.max = stockTalla.stock;
        
        if (stockTalla.stock < 1) {
            inputCantidad.disabled = true; 
            inputCantidad.value = 0;
        } else {
            inputCantidad.disabled = false; 
            inputCantidad.value = 1;
        }
    });

    async function getStockTalla(){
        let selectedTalla = selectTalla.value;
        let response = await fetch(`/api/tallas/${product.id}/getStockOfTalla/${selectedTalla}`, {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }

    let addButton = document.createElement('button');
    addButton.classList.add('botonAdd');
    addButton.textContent = 'Añadir al carrito';
    addButton.addEventListener('click', function() {
        console.log(selectTalla.value);
        if (inputCantidad.value > 0) {
            addCarrito(product, inputCantidad.value, selectTalla.value); 
        } else {
            alert('Por favor, selecciona una cantidad válida.');
        }
    });

    const volverButton = document.createElement('a');
    volverButton.textContent = 'Volver';
    volverButton.classList.add('buttonVolver');
    volverButton.href = tiendaUrl;

    productDiv.append(productImg,productName,productMarca,productTalla,productPrice,inputCantidad,addButton,volverButton);
    productContainer.appendChild(productDiv);

    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;
    productContainer.appendChild(productDescription);
}

function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.classList.add("show");

    setTimeout(() => {
        snackbar.classList.remove("show");
    }, 3000);
}

async function addCarrito(product, quantity, talla) {
    let respOrders = await fetch('/api/orders/cart');
    let order = await respOrders.json();
    console.log(respOrders);
    console.log(order);

    if(order === 'no registrado'){
        alert('Para añadir artículos a tu carrito, debes registrarte o estar logeado antes');
    }else{
        console.log(order.length);
        if(order.length == 0){
            await fetch('/api/orders', {
                method: "POST",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            });
            let respOrders2 = await fetch('/api/orders/cart');
            let order2 = await respOrders2.json();
            
            introducirProductoCarrito(order2[0].id,product.id,quantity,talla);
        } else{
            introducirProductoCarrito(order[0].id,product.id,quantity,talla);
        }    
        showSnackbar(`Producto "${product.name}" añadido al carrito`);
    }
    
}

async function introducirProductoCarrito(order,product_id,quantity, talla){
    let respOrderLines = await fetch('/api/orderLines');
    let orderLines = await respOrderLines.json();
    console.log(orderLines);
    let existe = false;
    let orderLineId;
    let orderLineCantidad = 0;

    orderLines.forEach( async line =>{
        if(line.product_id == product_id && line.talla == talla){
            orderLineId = line.id;
            orderLineCantidad = line.quantity + parseInt(quantity);
            existe = true;
        }
    });
    console.log(quantity);
    if(existe){
        fetch(`/api/orderLines/${orderLineId}`, {
            method: "PUT",
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"quantity": orderLineCantidad}),
        });
    }else{
        fetch('/api/orderLines',{
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"quantity": quantity,"order_id": order,"product_id":product_id, "talla":talla}),
        });
    }
    let numCarritoElement = document.getElementById("numCarrito");
    let currentCarritoCount = parseInt(numCarritoElement.textContent);
    numCarritoElement.textContent = currentCarritoCount + parseInt(quantity);
} 

mostrarProducto();

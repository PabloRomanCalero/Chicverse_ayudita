let token = document.querySelector('[name=_token]').value;

async function inicializar() {
    let selectedCategory = 'Zapatillas';
    let selectedSex = 'Hombre'; 

    const sexHombre = document.getElementById('sex-hombre');
    const sexMujer = document.getElementById('sex-mujer');

    sexHombre.addEventListener('click', function() {
        handleSexSelection('Hombre');
    });

    sexMujer.addEventListener('click', function() {
        handleSexSelection('Mujer');
    });

    function handleSexSelection(sex) {
        const selectedDiv = document.querySelector('#sexDiv div.selected');
        if (selectedDiv) {
            selectedDiv.classList.remove('selected');
        }

        const selectedSexDiv = document.getElementById(`sex-${sex.toLowerCase()}`);
        selectedSexDiv.classList.add('selected');
        
        console.log("Sexo seleccionado:", sex);
        selectedSex = sex; 
        loadProducts(selectedCategory, selectedSex);
    }

    const categoryItems = document.querySelectorAll('#listaCategory li');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            selectedCategory = this.textContent; 
            console.log("Categoría seleccionada:", selectedCategory);
            loadProducts(selectedCategory, selectedSex);
        });
    });

    let arrayProductos = await fetch('api/products');
    let productsData = await arrayProductos.json();
    let buscador = document.getElementById("buscador");
    let resultadosDiv = document.getElementById("resultadosDiv");

    buscador.addEventListener("input", () => {
        
        let filtro = buscador.value.trim().toLowerCase();
        let resultadosFiltrados = productsData.filter(producto => (producto.name).toLowerCase().startsWith(filtro));
        if (resultadosFiltrados.length > 0) {
            resultadosDiv.style.display = "block";    
            //vacio el div del autocomplete
            resultadosDiv.innerHTML="";
            resultadosFiltrados.forEach(producto => {
                let resultadoP = document.createElement("div");
                resultadoP.classList.add("resultadoP");
                resultadoP.textContent = producto.name;

                resultadoP.addEventListener("click", () => {
                    resultadosDiv.style.display = "none";
                    resultadosDiv.innerHTML = ""; 
                    buscador.value = producto.id;
                    
                });
                resultadoP.addEventListener('click', async function() {
                    let productId = buscador.value;
                             
                    let form = document.createElement('form');
                    form.action = `/product-info/${productId}`;
                    form.method = 'get';
                                
                    document.body.appendChild(form);
                    form.submit();
                });
                resultadosDiv.appendChild(resultadoP);
                if (filtro == ''){
                    resultadosDiv.style.display = "none";
                    resultadosDiv.innerHTML="";
                }; 
            }); 
        };
        
    });
   
    async function loadProducts(category, sex) {
        const productsContainer = document.getElementById('product-container');
        productsContainer.innerHTML = ''; 
        
        let productsData = await fetch(`/api/products/${sex}/${category}`);
        let products = await productsData.json();

        for (const product of products) {
            let imageProducts = await fetch(`/api/image/product/${product.id}`);
            let imageProductJson = await imageProducts.json();
            let imageProduct = imageProductJson[0]; 

            let productDiv = document.createElement('div');
            productDiv.classList.add('product');

            let productImg = document.createElement('img');
            productImg.src = imageProduct.url;
            productImg.alt = product.name;

            let productName = document.createElement('h3');
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
            productPrice.textContent = product.price + '€';

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

            let productForm = document.createElement('form');
            productForm.action = `/product-info/${product.id}`;
            productForm.method = 'get';

            let buttonVer = document.createElement('button');
            buttonVer.classList.add('buttonVer');
            buttonVer.type = 'submit';
            buttonVer.textContent = 'Ver más';

            productForm.appendChild(buttonVer);
            productDiv.append(productImg,productName,productMarca,productTalla,productPrice,inputCantidad,productForm,addButton);
            productsContainer.appendChild(productDiv);
        }
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
        let respOrderLines = await fetch('api/orderLines');
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
    loadProducts(selectedCategory, selectedSex);
}
inicializar();

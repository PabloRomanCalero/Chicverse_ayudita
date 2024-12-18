let sectionCarrito = document.querySelector('#section-carrito');
let token = document.querySelector('[name=_token]').value;

let footer = document.querySelector('.footer');
async function listarCarrito(){

    sectionCarrito.innerHTML="";
    try{
        let respOrderLines = await fetch('api/orderLines');
        let orderLines = await respOrderLines.json();
        console.log(orderLines);
        let orderLinesLength = orderLines.length;
        let contadorLinesLength = 0;
        let numCarrito = document.querySelector('#numCarrito');
        let numeroCarrito = 0;
        var stockTotal = true;
        let precioFinal = 0;
        let listaProductos = [];
       console.log(orderLines.length)

       if(orderLines.length === 0){
            let articleImg = document.createElement('article')
            let img = document.createElement('img');

            articleImg.className = 'article-img--check';
            img.className = 'img-check';
            img.src="/img/carrito/Check-mark.png";

            articleImg.append(img);
            sectionCarrito.append(articleImg);
            sectionCarrito.style="background-Color: white;"
        }
        orderLines.forEach(linea =>{
            numeroCarrito = numeroCarrito + linea.quantity;
        });
        numCarrito.textContent = numeroCarrito;

        orderLines.forEach( async line => {
            console.log(line);
            let resProducto = await fetch(`api/products/${line.product_id}`);
            let producto = await resProducto.json();

            let imageProducts = await fetch(`api/image/product/${line.product_id}`);
            let imageProductJson = await imageProducts.json();
            let imageProduct = imageProductJson[0]; 

            let resTalla = await fetch(`/api/tallas/${line.product_id}/getStockOfTalla/${line.talla}`, {
                method: "POST",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            });
            let tallaData = await resTalla.json();
                
            let articuloProducto = document.createElement('article');
            let img = document.createElement('img');
            let divNomStock = document.createElement('div');
            let nombre = document.createElement('h2');
            let talla = document.createElement('p');
            let stock = document.createElement('p');
            let divBotonCantidad = document.createElement('div');
            let mas = document.createElement('button');
            let cantidad = document.createElement('p');
            let menos = document.createElement('button');
            let precio = document.createElement('p');
            let precioTotalProducto = document.createElement('p');
            let botonEliminar = document.createElement('button');

            img.src = imageProduct.url;
            nombre.textContent = producto.name;
            menos.textContent = '-';
            mas.textContent = '+';
            precio.textContent = `Pr/ud: ${producto.price} €`;
            precio.dataset.precioInd = producto.price;
            precio.id = `${producto.id}-${tallaData.talla}-precioInd`;
            precioTotalProducto.textContent = `Total: ${(producto.price * line.quantity).toFixed(2)} €`;
            precioTotalProducto.id = `${producto.id}-${tallaData.talla}-precio`;
            precioTotalProducto.dataset.precio = producto.price * line.quantity;
            botonEliminar.textContent = 'Eliminar';
            talla.textContent = `TALLA : ${tallaData.talla}`;
            stock.textContent = `STOCK : ${tallaData.stock}`;
            stock.dataset.stock = tallaData.stock;
            stock.id = `${producto.id}-${tallaData.talla}-stock`;
            cantidad.textContent = line.quantity;
            cantidad.id = `${producto.id}-${tallaData.talla}-cantidad`;
            cantidad.dataset.cantidad = line.quantity;
            mas.value = line.id;
            menos.value = line.id;
            mas.dataset.id = line.quantity;
            mas.dataset.line = `${producto.id}-${tallaData.talla}`;
            menos.dataset.id = line.quantity;
            menos.dataset.line = `${producto.id}-${tallaData.talla}`;
            botonEliminar.value = line.id;

            articuloProducto.className="articulo--producto-carrito";
            img.className="img--producto-carrito";
            divNomStock.className = "div--nombreStock-carrito";
            talla.className = "talla--producto-carrito";
            stock.className = "stock--producto-carrito";
            divBotonCantidad.className = "div--botonCantidad-carrito";
            mas.className = "boton-mas-menos";
            cantidad.className = "cantidad-producto";
            menos.className = "boton-mas-menos";
            precio.className = "precio--producto-carrito";
            precioTotalProducto.className = "precioFinal--producto-carrito";
            botonEliminar.className ="boton--borrarProducto-carrito";

            divNomStock.append(nombre,talla,stock);
            divBotonCantidad.append(menos,cantidad,mas);
            articuloProducto.append(img,divNomStock,divBotonCantidad,precio,precioTotalProducto,botonEliminar);
            sectionCarrito.append(articuloProducto);

            precioFinal += producto.price * line.quantity;
            let precioTotalProductos = producto.price * line.quantity;
            listaProductos.push({"name":producto.name,"cantidad":line.quantity,"precio":precioTotalProductos,"product_id":producto.id,"stock":tallaData.stock, "talla": tallaData.talla});

            if(tallaData.stock < line.quantity){
                stockTotal = false;
            }

            contadorLinesLength += 1;
            if(contadorLinesLength === orderLinesLength){
                precioFinal = precioFinal.toFixed(2);
                compraFinal(precioFinal,numeroCarrito,stockTotal,orderLines);
                eventoSumarRestar();
                borrarLineOrder();
            }

        });

    }catch(error){
        if(error){
            let articleImg = document.createElement('article')
            let img = document.createElement('img');

            articleImg.className = 'article-img--check';
            img.className = 'img-check';
            img.src="/img/carrito/Check-mark.png";

            articleImg.append(img);
            sectionCarrito.append(articleImg);
            sectionCarrito.style="background-Color: white;"
        }
    }
}

function eventoSumarRestar(){
    
    let botonesCantidad = document.querySelectorAll('.boton-mas-menos');
    botonesCantidad.forEach(boton=>{
        boton.addEventListener('click',(e)=>{
            let orderLineId = e.target.value;
            let target = e.target.textContent;
            let line = e.target.getAttribute("data-line");
            let textCantidad = document.getElementById(`${line}-cantidad`);
            let textPrice = document.getElementById(`${line}-precio`);
            let cantidad = parseInt(textCantidad.textContent);

            let stock = document.getElementById(`${line}-stock`).getAttribute("data-stock");
            let price = document.getElementById(`${line}-precioInd`).getAttribute("data-precio-ind");
            console.log(stock);
            console.log(price);
            if (target === '+') {
                if (cantidad < stock) {
                    cantidad += 1;
                }
            } else if (target === '-') {
                cantidad -= 1;
            }
            textCantidad.textContent = cantidad;
            textCantidad.dataset.cantidad = cantidad;
            textPrice.textContent = `Total: ${(price * cantidad).toFixed(2)} €`;
            textPrice.dataset.precio = price * cantidad; 
            document.querySelector(".numCarrito").textContent = cantidad;

            let preciosProductosInd = document.querySelectorAll(".precioFinal--producto-carrito");
            let cantidadProductos = document.querySelectorAll(".cantidad-producto");
            var totalPrecios = 0;
            var totalCantidad = 0;
            preciosProductosInd.forEach(precioProductCant =>{
                totalPrecios += parseInt(precioProductCant.getAttribute("data-precio"));
            });
            cantidadProductos.forEach(cantProducto =>{
                totalCantidad += parseInt(cantProducto.getAttribute("data-cantidad"));
            });
            document.querySelector('.precio-carrito-final').textContent = `Total: ${totalPrecios.toFixed(2)} €`;
            document.querySelector('.articulos-carrito-final').textContent = `Hay ${totalCantidad} articulos en tu carrito`;
            document.querySelector('.articulos-carrito-final').dataset.cantFinal = totalCantidad;
            if(cantidad <= 0 ){
                fetch(`api/orderLines/${orderLineId}`, {
                    method: "DELETE",
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json',
                    },
                });
                listarCarrito();
            }else{
                fetch(`api/orderLines/${orderLineId}`, {
                    method: "PUT",
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"quantity": cantidad}),
                });
            }
        });

    });

}

function borrarLineOrder(){
    let botonesBorrar = document.querySelectorAll('.boton--borrarProducto-carrito');

    botonesBorrar.forEach((botonBorrar)=>{
        botonBorrar.addEventListener('click',(e)=>{
            let orderLineId = e.target.value;
            fetch(`api/orderLines/${orderLineId}`, {
                method: "DELETE",
                mode:'cors',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(resp=> resp.json()).then(resp=>console.log(resp));

            listarCarrito();
        });
    })
}

async function compraFinal(precioFinal,numeroCarrito,stockTotal,orderLines){
    
    let articuloCompraFinal = document.createElement('article');
    let botonFinalizarCompra = document.createElement('button');
    let articulosCarrito = document.createElement('p');
    let totalPrecio = document.createElement('p');

    let descuentosUser = await fetch('/api/descuentos');
    let descuentos = await descuentosUser.json();
    let precioSinDescuento = precioFinal;
    console.log(descuentos);
    if(descuentos.length > 0){
        let selectDescuentos = document.createElement('select');
        selectDescuentos.className = 'select-descuentos';

        let optionDefault = document.createElement('option');
        optionDefault.text = 'Selecciona un descuento';
        optionDefault.value = '';
        selectDescuentos.append(optionDefault);

        descuentos.forEach(descuento => {
            let option = document.createElement('option');
            option.text = `${descuento.descuento*100}% de descuento`;
            option.value = descuento.descuento;
            selectDescuentos.append(option);
        });

        selectDescuentos.addEventListener('change', (e) => {
            let descuentoSeleccionado = e.target.value;
            
            if (descuentoSeleccionado) {
                precioFinal = (precioSinDescuento - (precioSinDescuento * descuentoSeleccionado)).toFixed(2);
                console.log(precioFinal);
            } else{
                precioFinal = precioSinDescuento;
            }
            
            totalPrecio.textContent = `Total: ${precioFinal} €`;
        });
        articuloCompraFinal.append(selectDescuentos);
    }
    
    botonFinalizarCompra.textContent = 'Finalizar la compra';
    if (numeroCarrito === 1) { articulosCarrito.textContent = `Hay ${numeroCarrito} artículo en tu carrito` }
    else { articulosCarrito.textContent = `Hay ${numeroCarrito} artículos en tu carrito` }
    totalPrecio.textContent = `Total: ${precioFinal} €`;

    articuloCompraFinal.className = "articulo-carrito-final";
    botonFinalizarCompra.className = "boton-carrito-finalizar-compra";
    articulosCarrito.className = "articulos-carrito-final";
    articulosCarrito.dataset.cantFinal = numeroCarrito;
    totalPrecio.className = "precio-carrito-final";
    

    articuloCompraFinal.append(botonFinalizarCompra, articulosCarrito, totalPrecio);
    sectionCarrito.append(articuloCompraFinal);

    let articleFinalVentaProducto = document.createElement('article');
    articleFinalVentaProducto.className = "articulo-final-venta";

    botonFinalizarCompra.addEventListener('click', async (e) => {

        var listaProductos = [];
        var precioFinal = 0;
        let respOrderLines = await fetch('api/orderLines');
        let orderLines2 = await respOrderLines.json();

        orderLines2.forEach(async line => {
            let resProducto = await fetch(`api/products/${line.product_id}`);
            let producto = await resProducto.json();

            let resTalla = await fetch(`/api/tallas/${line.product_id}/getStockOfTalla/${line.talla}`, {
                method: "POST",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            });
            let tallaData = await resTalla.json();
            let precioTotalProductos = producto.price * line.quantity;
            precioFinal += precioTotalProductos;
            listaProductos.push({"name":producto.name,"cantidad":line.quantity,"precio":precioTotalProductos,"product_id":producto.id,"stock":tallaData.stock, "talla": tallaData.talla});
        });

        let respUser = await fetch('/api/users/viewUser');
        let userAndAddress = await respUser.json();
        let user = userAndAddress[0];
        let addresses = userAndAddress[1];
        console.log(user, addresses);
        let edad = getEdad(user.birthdate);
        var direccion = true;
        console.log(edad);
        let finalizaCompraBoolean = true;
        let arrayErrores = [];
        
        articleFinalVentaProducto.innerHTML = "";

        if (edad < 18) {
            finalizaCompraBoolean = false;
            arrayErrores.push('Para comprar productos en la tienda, deberás tener al menos 18 años');
        }

        let cantidadProductos = document.querySelectorAll(".cantidad-producto");
        let stockProductos = document.querySelectorAll(".stock--producto-carrito");

        console.log(cantidadProductos);
        console.log(stockProductos);
        stockTotal = true;
        if (cantidadProductos.length === stockProductos.length) {
            for (let i = 0; i < cantidadProductos.length; i++) {
                let cantidad = parseInt(cantidadProductos[i].dataset.cantidad);
                let stock = parseInt(stockProductos[i].dataset.stock);
                console.log(cantidad);
                console.log(stock);
                if (cantidad > stock) {
                    stockTotal = false;
                }
            }
        }
        if (!stockTotal) {
            finalizaCompraBoolean = false;
            arrayErrores.push('Lo sentimos pero algún producto no tiene stock suficiente.');
        }
        if (addresses.length === 0) {
            finalizaCompraBoolean = false;
            arrayErrores.push('Para poder comprar deberá tener registrada una dirección.');
            direccion = false;
        }
        console.log(stockTotal);
        if (finalizaCompraBoolean) {
            sectionCarrito.innerHTML = "";
            let tituloConfirmacionDireccion = document.createElement('h1');
            tituloConfirmacionDireccion.textContent = 'Confirme una dirección para el pedido'
            tituloConfirmacionDireccion.className = "titulo-confirmacion";
            let listaDirecciones = document.createElement('ul');
            listaDirecciones.className = 'lista-direcciones-carrito';

            addresses.forEach(address => {
                let liDireccion = document.createElement('li');
                liDireccion.textContent = `Direccion: ${address.nombre}, Nº ${address.patio}, piso ${address.piso}, puerta ${address.puerta}, ${address.cp}, ${address.localidad}, ${address.pais}`;
                let botonConfirmarDireccion = document.createElement('button');
                botonConfirmarDireccion.textContent = 'Confirmar';
                botonConfirmarDireccion.value = address.id;
                botonConfirmarDireccion.dataset.cp = address.cp;
                botonConfirmarDireccion.className = "boton-confirmacion-direccion";
                liDireccion.append(botonConfirmarDireccion);
                listaDirecciones.append(liDireccion);
            });
            sectionCarrito.append(tituloConfirmacionDireccion, listaDirecciones);
            let botonesdirecciones = document.querySelectorAll('.boton-confirmacion-direccion');

            let resOrder = await fetch('/api/orders/cart');
            let order = await resOrder.json();
            let orderId = order[0].id;
            console.log(orderId);

            for (let botonDireccion of botonesdirecciones) {

                botonDireccion.addEventListener('click', async (e) => {
                    let addresId = e.target.value;
                    let cp = e.target.getAttribute("data-cp");
                    console.log(orderId, addresId);
                    sectionCarrito.innerHTML = "";
                    let articleVentaFinal = document.createElement('article');
                    articleVentaFinal.className = "article-venta-final";
                    console.log(listaProductos);

                    let precioTotalFinal = 0;
                    let precioFinalProductos = document.createElement('p');
                    let tituloProductosPedido = document.createElement('h1');
                    precioFinalProductos.className = "precio-final-venta";
                    tituloProductosPedido.textContent = "Productos Del Pedido";
                    tituloProductosPedido.className = "titulos-carrito";
                    articleVentaFinal.append(tituloProductosPedido);

                    listaProductos.forEach(producto => {
                        precioTotalFinal += producto.precio;
                        let divProducto = document.createElement('div');
                        let tituloProducto = document.createElement('p');
                        let cantidadProducto = document.createElement('p');
                        let precioProducto = document.createElement('p');

                        divProducto.className = 'div-producto-final-compra';
                        tituloProducto.className = 'titulo-producto-compra-final';
                        cantidadProducto.className = 'cantidad-producto-compra-final';
                        precioProducto.className = 'precio-producto-compra-final';

                        tituloProducto.textContent = producto.name;
                        
                        cantidadProducto.textContent = `Cantidad: ${producto.cantidad}`;
                        console.log(precioFinal);
                        precioProducto.textContent = `Precio: ${producto.precio} €`;
                        
                        divProducto.append(tituloProducto, cantidadProducto, precioProducto);
                        articleVentaFinal.append(divProducto);
                    });
                    
                    let precioEnvio = document.createElement('p');
                    let botonFinalizarPago = document.createElement('button');
                    botonFinalizarPago.className = 'boton-finalizar-pago';
                    botonFinalizarPago.textContent = 'Finalizar pago';
                    
                    function esCodigoPostalCanarias(cp) {
                        let cpNumerico = parseInt(cp);
                        return (cpNumerico >= 35000 && cpNumerico <= 35999) || (cpNumerico >= 38000 && cpNumerico <= 38999);
                    }
                    
                    let precioEnvioBase = 3.95;
                    
                    if (esCodigoPostalCanarias(cp)) {
                        precioEnvioBase += 15; 
                    }

                    if (precioTotalFinal < 99.99) {
                        let anuncio = document.createElement('p');
                        console.log(precioFinal);
                        precioTotalFinal += precioEnvioBase;
                        console.log(precioTotalFinal);
                        anuncio.textContent = 'Si el total de la compra supera los 100€, el envio será gratuito';
                        precioEnvio.textContent = `Precio del envio: ${precioEnvioBase.toFixed(2)}€`;
                        precioFinalProductos.textContent = `Total del pedido: ${precioTotalFinal.toFixed(2)} €`;
                        articleVentaFinal.append(anuncio);
                    } else {
                        precioEnvio.textContent = 'Precio del envio: 0€';
                        precioFinalProductos.textContent = `Total del pedido: ${precioTotalFinal} €`;
                    }
                    articleVentaFinal.append(precioEnvio, precioFinalProductos, botonFinalizarPago);
                    sectionCarrito.append(articleVentaFinal);
                    

                    botonFinalizarPago.addEventListener('click', async (e) => {
                        sectionCarrito.innerHTML = "";

                        let tituloMetodosPago = document.createElement('h2');
                        tituloMetodosPago.textContent = "Métodos de Pago";
                        tituloMetodosPago.className = "titulo-metodos-pago";

                        let contenedorMetodosPago = document.createElement('div');
                        contenedorMetodosPago.className = "contenedor-metodos-pago";

                        let metodosPago = ["Contraremoblso", "PayPal", "Tarjeta"];
                        metodosPago.forEach(metodo => {
                            console.log("b");
                            let metodoPago = document.createElement('button');
                            metodoPago.className = "metodo-pago";
                            metodoPago.value = metodo;
                        
                            let spanMetodo = document.createElement("span");
                            spanMetodo.textContent = metodo;
                        
                            let imgCard = document.createElement("img");
                            let extension = metodo.includes('svg') ? 'svg' : 'png';
                            imgCard.src = `${publicPath}/${metodo}.${extension}`;
                            
                            metodoPago.appendChild(imgCard);
                            metodoPago.appendChild(spanMetodo);
                            contenedorMetodosPago.appendChild(metodoPago);
                        });
                        console.log("a");
                        sectionCarrito.append(tituloMetodosPago, contenedorMetodosPago);
                    });

                        /*fetch(`/api/orders/${orderId}`, {
                            method: "PUT",
                            headers: {
                                'X-CSRF-TOKEN': token,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ "address_id": addresId, "totalPrice": precioTotalFinal }),
                        });

                        listaProductos.forEach(async (producto) => {
                            console.log(producto.talla);
                            let stock = producto.stock - producto.cantidad;
                            console.log(stock);
                            fetch('/api/tallas/stockUpdate', {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ "stock": stock, "talla": producto.talla, "product_id": producto.product_id }),
                            });
                        });
                        document.querySelector(".numCarrito").textContent = "0";
                        setTimeout(() => {
                            listarCarrito();
                        }, 6000);
                        sectionCarrito.innerHTML = "";
                        let articleFinal = document.createElement('article');
                        articleFinal.className = "article-final";
                        let tituloUltimo = document.createElement('h1');
                        tituloUltimo.className = "titulo-ultimo";
                        tituloUltimo.textContent = 'Esto es una simulación del pago total por el carrito y sus productos, finalizará aquí, gracias por su compra';
                        articleFinal.append(tituloUltimo)
                        sectionCarrito.append(articleFinal);*/

                });
            }

        } else {
            let listaErrores = document.createElement('ul');
            listaErrores.className = "lista-errores-carrito";
            for (let error of arrayErrores) {
                let liError = document.createElement('li');
                liError.textContent = error;
                listaErrores.append(liError);
            }
            let titulo = document.createElement('h1');
            let subtitulo = document.createElement('h2');
            let botonCerrar = document.createElement('button');
            titulo.textContent = 'VAYA VAYA... PARACE QUE ALGO ANDA MAL...';
            subtitulo.textContent = 'Creo que deberias revisar los siguientes errores...';
            botonCerrar.textContent = 'Cerrar aviso';
            botonCerrar.className = "boton-cerrar";
            titulo.className = "titulo-error-carrito";
            subtitulo.className = "subtitulo-error-carrito";

            if(!direccion){
                let botonFormAddress = document.createElement('a');
                botonFormAddress.className = 'botonForm'; 
                botonFormAddress.href = rutaDireccion; 
                botonFormAddress.textContent = 'Añadir Dirección';
                articleFinalVentaProducto.append(titulo, subtitulo, listaErrores, botonCerrar, botonFormAddress);
            }else{
                articleFinalVentaProducto.append(titulo, subtitulo, listaErrores, botonCerrar);
            }

            
            sectionCarrito.append(articleFinalVentaProducto);
            let scroll = articleFinalVentaProducto.getBoundingClientRect();
            window.scrollTo(scroll.x, scroll.y);
            console.log(scroll);
            botonCerrar.addEventListener('click', e => {
                articleFinalVentaProducto.innerHTML = "";
            });
        }
    });

}

function getEdad(dateString){
    let hoy = new Date();
    let fechaNacimiento = new Date(dateString);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
}

listarCarrito();
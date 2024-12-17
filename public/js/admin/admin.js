
let bloqueLista = document.querySelector('#productos-usuarios');
let botonUsuarios = document.querySelector('#usuarios');
let botonPedidos = document.querySelector('#pedidos');
let botonProductos = document.querySelector('#productos');
let botonPublicaciones = document.querySelector('#publicaciones');
let tokenInput = document.querySelector('[name=_token]');
let token = tokenInput.value;
let articleEdicion = document.querySelector('#edicion')
let divErrores = document.createElement('div');
divErrores.className = "div_errores";

const listar = async(nombre)=>{

    let lista;
    if(nombre === 'PRODUCTOS'){
        let res2 = await fetch("/api/products");
        let productos = await res2.json();
        lista = productos;
        let res3 = await fetch("/api/images");
        images = await res3.json();

    }else if(nombre === 'USUARIOS'){
        let res = await fetch("/api/users");
        users = await res.json();
        lista = users;
    }else if(nombre === 'PEDIDOS'){
        let res5 = await fetch("/api/orders");
        pedidos = await res5.json();
        lista = pedidos;
    }else if(nombre === 'TALLAS'){
        let product_id = botonProductos.getAttribute("data-productId");
        console.log(product_id);
        let res6 = await fetch("/api/tallas/tallasOfProduct", {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "product_id": product_id})
        });
        tallas = await res6.json();
        lista = tallas;
    }else if(nombre === 'PUBLICACIONES'){
        let res8 = await fetch("/api/media");
        media = await res8.json();
        lista = media;
    }else if(nombre === 'COMENTARIOS'){
        let media_id = botonPublicaciones.getAttribute("data-mediaId");
        console.log(media_id);
        let res9 = await fetch("/api/comments/mediaComments", {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "media_id": media_id})
        });
        comments = await res9.json();
        console.log(comments);
        lista = comments;
    }

    let titulo_lista = document.createElement('h2');
    bloqueLista.innerHTML="";
    articleEdicion.innerHTML="";
    titulo_lista.textContent = nombre;
    titulo_lista.className="titulo-lista";
    bloqueEditar = document.createElement('div');
    bloqueEditar.className="bloque-editar";
    articleEdicion.append(bloqueEditar);
    bloqueLista.append(titulo_lista);

    lista.forEach(element => {
        if(nombre === 'PRODUCTOS'){
            let liId = document.createElement("li");
            let liName = document.createElement("li");
            let liCategory = document.createElement("li");
            let liSex = document.createElement("li");
            let liPrice = document.createElement("li");
            let liDescription = document.createElement("li");
            let liImage = document.createElement('li');
            let lista_admin = document.createElement('ul');

            let liBotones = document.createElement('li');
            let botonEditar = document.createElement('button');
            let botonBorrar = document.createElement('button');
            let botonVerTallas = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.value = element.id;
            botonEditar.className ="edit_button";
            botonBorrar.textContent = 'Borrar';
            botonBorrar.value = element.id;
            botonBorrar.className = "delete_button";
            botonVerTallas.textContent = 'Ver Tallas';
            botonVerTallas.value = element.id;
            botonVerTallas.className = "verTallas_button";
            liBotones.className="botones-lista"
            liBotones.append(botonEditar,botonBorrar, botonVerTallas);

            liId.textContent = 'ID: '+ element.id;
            liName.textContent = 'Name: '+element.name;
            liCategory.textContent = 'Category: '+ element.category;
            liSex.textContent = 'Sex: '+ element.sex;
            liPrice.textContent = 'Price: '+element.price;
            images.forEach(image => {
                if(image.product_id === element.id){
                    liImage.textContent = 'URL: '+ image.url;
                }
            });
            liDescription.textContent = 'Descripción: '+element.description;
            lista_admin.className = 'lista-admin';
            lista_admin.append(liId,liName,liCategory,liSex,liPrice,liDescription,liImage,liBotones);
            bloqueLista.append(lista_admin);

            botonVerTallas.addEventListener('click',(e) =>{
                botonProductos.setAttribute("data-productId", element.id);
                listar('TALLAS');
            });

        }else if(nombre === 'USUARIOS'){
            let liId = document.createElement("li");
            let liName = document.createElement("li");
            let liUserName = document.createElement("li");
            let liEmail = document.createElement("li");
            let liDNI = document.createElement("li");
            let liPhone = document.createElement("li");
            let liBirthdate = document.createElement("li");
            let lista_admin = document.createElement('ul');
            let liBotones = document.createElement('li');
            let botonEditar = document.createElement('button');
            let botonBorrar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.value = element.id;
            botonEditar.className ="edit_button";
            botonBorrar.textContent = 'Borrar';
            botonBorrar.className = "delete_button";
            botonBorrar.value = element.id;
            liBotones.className="botones-lista"
            liBotones.append(botonEditar,botonBorrar);

            liId.textContent = 'ID: '+ element.id;
            liName.textContent = 'Nombre: ' + element.name + ' ' + element.surname + ' ' + (element.surname2 ? element.surname2 : '');
            liUserName.textContent = 'Nombre usuario : '+ element.username;
            console.log(element.email)
            liEmail.textContent = 'Email : '+element.email;
            liDNI.textContent = 'DNI : '+element.dni;
            liPhone.textContent = 'Teléfono: '+element.phone;
            liBirthdate.textContent = 'Fecha Nacimiento : '+ element.birthdate;
            lista_admin.className = 'lista-admin';
            lista_admin.append(liId,liName,liUserName,liEmail,liDNI,liPhone,liBirthdate,liBotones);
            bloqueLista.append(lista_admin);

        }else if(nombre === 'PEDIDOS') {
            let lista_admin = document.createElement('ul');
            let liId = document.createElement("li");
            let liStatus = document.createElement("li");
            let liTypePayment = document.createElement("li");
            let liTotalPrice = document.createElement("li");
            let liDate = document.createElement("li");
            let liUserId = document.createElement("li");
            let liAddressId = document.createElement("li");
            let liBotones = document.createElement("li");
            let botonEditar = document.createElement("button");
            let botonBorrar = document.createElement("button");
            botonEditar.textContent = "Editar";
            botonEditar.value = element.id;
            botonEditar.className = "edit_button";
            botonBorrar.textContent = "Borrar";
            botonBorrar.value = element.id;
            botonBorrar.className = "delete_button";
            liBotones.className = "botones-lista";
            liBotones.append(botonEditar, botonBorrar);
        
            liId.textContent = "ID: " + element.id;
            liStatus.textContent = "Estado: " + element.status;
            liTypePayment.textContent = "Tipo de Pago: " + element.type_payment;
            liTotalPrice.textContent = "Precio Total: $" + element.totalPrice;
            liDate.textContent = "Fecha: " + element.date;
            liUserId.textContent = "ID Usuario: " + element.user_id;
            liAddressId.textContent = "ID Dirección: " + element.address_id;
        
            lista_admin.append(liId, liStatus, liTypePayment, liTotalPrice, liDate, liUserId, liAddressId, liBotones);
            bloqueLista.append(lista_admin);
        }else if(nombre === 'TALLAS') {
            
            titulo_lista.textContent = "TALLAS DEL PRODUCTO " + element.product_id

            let lista_admin = document.createElement('ul');
            let liIdTalla = document.createElement("li");
            let liTalla = document.createElement("li");
            let liStock = document.createElement("li");

            let liBotones = document.createElement("li");
            let botonEditar = document.createElement("button");
            botonEditar.textContent = "Editar";
            botonEditar.value = element.id;
            botonEditar.className = "edit_button";
            liBotones.className = "botones-lista";
            liBotones.append(botonEditar);

            liIdTalla.textContent = "ID: " + element.id;
            liTalla.textContent = "Talla: " + element.talla;
            liStock.textContent = "Stock: " + element.stock;

            lista_admin.append(liIdTalla, liTalla, liStock, liBotones);
            bloqueLista.append(lista_admin);    
        }else if(nombre === 'PUBLICACIONES') {

            let lista_admin = document.createElement('ul');
            let liId = document.createElement("li");
            let liUserId = document.createElement("li");
            let liProductId = document.createElement("li");
            let liUrl = document.createElement("li");
            let liLikes = document.createElement("li");
            let liDescription = document.createElement("li");
            let liBotones = document.createElement('li');
            let botonEditar = document.createElement('button');
            let botonBorrar = document.createElement('button');
            let botonVerComentarios = document.createElement('button');

            botonEditar.textContent = 'Editar';
            botonEditar.value = element.id;
            botonEditar.className = "edit_button";
            botonBorrar.textContent = 'Borrar';
            botonBorrar.className = "delete_button";
            botonBorrar.value = element.id;
            botonVerComentarios.textContent = 'Ver Comentarios';
            botonVerComentarios.className = "verComentarios_button";
            botonVerComentarios.value = element.id;
            liBotones.className = "botones-lista";
            liBotones.append(botonEditar, botonBorrar, botonVerComentarios);

            liId.textContent = 'ID: ' + element.id;
            liUserId.textContent = 'ID Usuario: ' + element.user_id;
            liProductId.textContent = 'ID Producto: ' + element.product_id;
            liUrl.textContent = 'URL: ' + element.url;
            liLikes.textContent = 'Likes: ' + element.likes;
            liDescription.textContent = 'Descripción: ' + element.description;
            
            lista_admin.append(liId,liUserId,liProductId,liUrl,liLikes,liDescription,liBotones);
            bloqueLista.append(lista_admin); 
            
            botonVerComentarios.addEventListener('click',(e) =>{
                botonPublicaciones.setAttribute("data-mediaId", element.id);
                listar('COMENTARIOS');
            });

        }else if(nombre === 'COMENTARIOS') {

            let media_id = botonPublicaciones.getAttribute("data-mediaId");
            titulo_lista.textContent = "COMENTARIOS DE LA PUBLICACIÓN " + media_id;
            element.forEach(comment =>{
                let lista_admin = document.createElement('ul');
                let liIdComentario = document.createElement("li");
                let liMediaId = document.createElement("li");
                let liUserId = document.createElement("li");
                let liComentario = document.createElement("li");
                let liBotones = document.createElement("li");
                let botonBorrar = document.createElement("button");

                botonBorrar.textContent = "Borrar";
                botonBorrar.value = comment.id;
                botonBorrar.className = "delete_button";
                liBotones.className = "botones-lista";
                liBotones.append(botonBorrar);

                liIdComentario.textContent = "ID Comentario: " + comment.id;
                liMediaId.textContent = "ID Publicación: " + comment.media_id;
                liUserId.textContent = "ID Usuario: " + comment.user_id;
                liComentario.textContent = "Comentario: " + comment.comment;

                lista_admin.append(liIdComentario, liMediaId, liUserId, liComentario, liBotones);
                bloqueLista.append(lista_admin);
            })       
        }
    });
    edit(nombre);
    deleteProductsUsersOrdersMediaComments(nombre); 
}

const deleteProductsUsersOrdersMediaComments = async(nombre)=>{
    deleteButtons = document.querySelectorAll('.delete_button');
    deleteButtons.forEach((deleteButton)=>{
        deleteButton.addEventListener('click',(e)=>{
            //console.log(e)
            getProductsUsersMediaCommentsAndOrdersForDelete(e,nombre);
        })
    })
}

const getProductsUsersMediaCommentsAndOrdersForDelete = async(e,nombre)=>{

    let id = e.target.value;

    console.log(id);
    console.log(nombre)
    if(nombre === 'PRODUCTOS'){
        let resProducto = await fetch(`/api/products/${id}`);
        let producto = await resProducto.json();
        let mensajeProduct = confirm(`Estas seguro de querer borrar el producto ${producto.name} de tipo ${producto.category} ?`);
        if(mensajeProduct){
            fetch(`/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(()=>listar('PRODUCTOS'));
        }
    }else if(nombre === 'USUARIOS'){
        let resUser = await fetch(`/api/users/${id}`);
        let user = await resUser.json();
        console.log(user);
        let mensajeUser = confirm(`Estas seguro de querer borrar el usuario ${user.name} de DNI ${user.dni} ?`);
        if(mensajeUser){
            fetch(`/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(()=>listar('USUARIOS'));
        }
    }else if(nombre === 'PEDIDOS'){
        let resOrder = await fetch(`/api/orders/${id}`);
        let order = await resOrder.json();
        let mensajeOrder = confirm(`Estas seguro de querer borrar el pedido ${order.id}?`);
        if(mensajeOrder){
            fetch(`/api/orders/${id}`, {
                method: "DELETE",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(()=>listar('PEDIDOS'));
        }
    }else if(nombre === 'PUBLICACIONES'){
        let resMedia = await fetch(`/api/media/${id}`);
        let media = await resMedia.json();
        console.log(media);
        let mensajeMedia = confirm(`Estas seguro de querer borrar la publicación ${media.id}?`);
        if(mensajeMedia){
            fetch(`/api/media/${id}`, {
                method: "DELETE",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(()=>listar('PUBLICACIONES'));
        }
    }else if(nombre === 'COMENTARIOS'){
        let resComment = await fetch(`/api/comments/${id}`);
        let comment = await resComment.json();
        console.log(comment);
        let mensajeComment = confirm(`Estas seguro de querer borrar el comentario ${comment.id}?`);
        if(mensajeComment){
            fetch(`/api/comments/${id}`, {
                method: "DELETE",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(()=>listar('COMENTARIOS'));
        }
    }
}


const edit = async(nombre)=>{
    let editButtons = document.querySelectorAll('.edit_button');
    console.log("amai");
    for(let edit_button of editButtons ){
        edit_button.addEventListener('click',(e)=>{
            console.log(e.target.value)
            bloqueEditar.innerHTML="";

            const getUserMediaProductsTallasAndOrders= async()=>{
                let boton_enviar_cambios = document.createElement('button');
                boton_enviar_cambios.className="boton_guardar_cambios";
                boton_enviar_cambios.textContent = "Guardar Cambios"
                console.log('alo');
                if(nombre === 'USUARIOS'){
                    let respUsuario = await fetch(`/api/users/${e.target.value}`);
                    let usuario = await respUsuario.json();

                    let divInputs = document.createElement('div')
                    let inputName = document.createElement('input');
                    let inputSurname = document.createElement('input');
                    let inputSurname2 = document.createElement('input');
                    let inputUserName = document.createElement('input');
                    let inputEmail = document.createElement('input');
                    let inputDNI = document.createElement('input');
                    let inputPhone = document.createElement('input');
                    let inputFechaNacimiento = document.createElement('input');
                    let divImageProfile = document.createElement('div');
                    let imgProfile = document.createElement('img');

                    divImageProfile.classList.add('divImageProfile')
                    divInputs.classList.add('divInputs')

                    inputName.type = "text";
                    inputSurname.type ="text";
                    inputSurname2.type = "text";
                    inputUserName.type = "text";
                    inputDNI.type ="text";
                    inputPhone.type ="number";
                    inputFechaNacimiento.type = "date";

                    console.log(usuario.name)
                    inputName.value = usuario.name;
                    inputSurname.value = usuario.surname;
                    inputSurname2.value = usuario.surname2;
                    inputUserName.value = usuario.username;
                    inputEmail.value = usuario.email;
                    inputDNI.value = usuario.dni;
                    inputPhone.value = usuario.phone;
                    inputFechaNacimiento.value = usuario.birthdate;
                    imgProfile.src = usuario.profile_photo

                    divInputs.append('Nombre: ',inputName,'Apellido: ',inputSurname,'2Apellido: ',inputSurname2,'Nombre Usuario: ',inputUserName,'DNI: ',inputDNI,'Correo electrónico: ', inputEmail,
                    'Teléfono: ',inputPhone,'Fecha Nacimiento: ',inputFechaNacimiento,boton_enviar_cambios,divErrores)
                    divImageProfile.append(imgProfile)
                    bloqueEditar.append(divInputs, divImageProfile);

                    boton_enviar_cambios.addEventListener('click',(e)=>{
                        let arrayErrores = [];
                        let error = false;
                        if(inputName.value === '' || inputName.value === null  || inputName.value.length > 30){
                            arrayErrores.push('Error en el nombre , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSurname.value === '' || inputSurname.value === null || inputSurname.value.length > 25){
                            arrayErrores.push('Error en el apellido , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSurname2.value.length > 25){
                            arrayErrores.push('El segundo apellido es demasiado largo');
                            error = true;
                        }
                        if(inputUserName.value === '' || inputUserName.value === null || inputUserName.value.length > 25){
                            arrayErrores.push('Error en nombre sde usuario , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputDNI.value === '' || inputDNI.value === null || inputDNI.value.length >9){
                            arrayErrores.push('Error en el DNI , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputPhone.value.length >12){
                            arrayErrores.push('Error en el telefono , por favor escríbalo bien');
                            error = true;
                        }
                        if(error){
                            divErrores.innerHTML="";
                            let ulErrores = document.createElement('ul');
                            ulErrores.className='lista_errores';
                            for(let _error of arrayErrores){
                                let liError = document.createElement('li');
                                liError.textContent = _error;
                                ulErrores.append(liError);
                            }
                            divErrores.append(ulErrores);
                        }else{
                            let usuarioCambiado = {"name" : inputName.value,"surname":inputSurname.value,"surname2":inputSurname2.value,
                                                    "username": inputUserName.value,"dni":inputDNI.value,"phone":inputPhone.value,"birthdate":inputFechaNacimiento.value};
                            let usuarioId = usuario.id;
                            console.log(usuarioId);
                            fetch(`/api/users/${usuarioId}`, {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(usuarioCambiado),
                            }).then((res) => {
                                console.log('jojojo')
                                listar('USUARIOS');
                            });
                            divErrores.innerHTML="";
                            console.log('guay')
                        }
                    })
                }else if(nombre === 'PRODUCTOS'){
                    let respProducto = await fetch(`/api/products/${e.target.value}`);
                    let producto = await respProducto.json();
                    let res4 = await fetch("/api/images");
                    images = await res4.json();
                    console.log(images);
                    console.log(producto);

                    let divInputs = document.createElement('div')
                    let inputName = document.createElement('input');
                    let inputCategory = document.createElement('input');
                    let inputSex = document.createElement('input');
                    let inputBrand = document.createElement('input');
                    let inputPrice = document.createElement('input');
                    let inputDescription = document.createElement('textarea');
                    let inputImage = document.createElement('input');
                    let divImageProduct = document.createElement('div');
                    let imgProduct = document.createElement('img');
                    
                    divInputs.classList.add('divInputs');
                    divImageProduct.classList.add('divImageProduct');

                    inputDescription.cols ="40";
                    inputDescription.rows ="5";
                    inputName.type = "text";
                    inputCategory.type = "text";
                    inputSex.type = "text";
                    inputBrand.type = "text";
                    inputPrice.type = "number";
                    inputDescription.type = "text";

                    console.log(producto.category);
                    inputName.value = producto.name;
                    inputCategory.value = producto.category;
                    inputSex.value = producto.sex;
                    inputBrand.value = producto.brand;
                    inputPrice.value = producto.price;
                    inputDescription.value = producto.description;

                    images.forEach(image => {
                        if(image.product_id === producto.id){
                            inputImage.value = image.url;
                            imgProduct.src = image.url;
                            idImage = image.id;
                        }
                    });
                    divInputs.append('Nombre: ',inputName,'Tipo: ',inputCategory,'Sexo: ',inputSex, 'Marca: ',inputBrand,
                    inputPrice,'Descripción: ',inputDescription,'URL: ',inputImage, boton_enviar_cambios,divErrores)
                    divImageProduct.append(imgProduct);
                    bloqueEditar.append(divInputs, divImageProduct);

                    boton_enviar_cambios.addEventListener('click',(e)=>{
                        let arrayErrores = [];
                        let error = false;
                        if(inputName.value === '' || inputName.value === null  || inputName.value.length > 30){
                            arrayErrores.push('Error en el nombre del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputCategory.value === '' || inputCategory.value === null || inputCategory.value.length > 25){
                            arrayErrores.push('Error en el tipo del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSex.value != 'Hombre' && inputSex.value != 'Mujer' && inputSex.value != 'Unisex'){
                            arrayErrores.push('Error en el sex del producto, por favor escríbalo bien ("Hombre" o "Mujer")');
                            error = true;
                        }
                        if(inputBrand.value === '' || inputBrand.value === null){
                            arrayErrores.push('Error en la marca del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputPrice.value === '' || inputPrice.value === null || isNaN(inputPrice.value)){
                            arrayErrores.push('Error en la talla del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputDescription.value === '' || inputDescription.value === null || inputDescription.value.length > 255){
                            arrayErrores.push('Error en la descripción del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputImage.value === '' || inputImage.value === null ){
                            arrayErrores.push('Error en el imagen , por favor escríbalo bien');
                            error = true;
                        }
                        if(error){
                            divErrores.innerHTML="";
                            let ulErrores = document.createElement('ul');
                            ulErrores.className='lista_errores';
                            for(let _error of arrayErrores){
                                let liError = document.createElement('li');
                                liError.textContent = _error;
                                ulErrores.append(liError);
                            }
                            divErrores.append(ulErrores);
                        }else{
                            let productoCambiado = {"name" : inputName.value,"category":inputCategory.value,"sex":inputSex.value,"brand":inputBrand.value,
                            "price":inputPrice.value,"description": inputDescription.value};
                            fetch(`/api/products/${producto.id}`, {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(productoCambiado),
                            })
                            console.log(idImage);
                            fetch(`/api/images/${idImage}`, {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({"url":inputImage.value}),
                            }).then((res) => {
                                listar('PRODUCTOS');
                            });
                            divErrores.innerHTML="";
                        }
                    });
                }else if(nombre === 'TALLAS'){
                    let respTalla = await fetch(`/api/tallas/${e.target.value}`);
                    let talla = await respTalla.json();
                    let divInputs = document.createElement('div');
                    let inputStock = document.createElement('input');
                    inputStock.type = "number";
                    inputStock.value = talla.stock
                    divInputs.classList.add('divInputs');
                    divInputs.append(`Stock de talla ${talla.talla}: `, inputStock, boton_enviar_cambios,divErrores)
                    bloqueEditar.append(divInputs);

                    boton_enviar_cambios.addEventListener('click',(e)=>{
                        let arrayErrores = [];
                        let error = false;
                        if (inputStock.value === '' || inputStock.value === null || isNaN(inputStock.value) || parseInt(inputStock.value) < 0) {
                            arrayErrores.push('Error en el stock , debe ser un numero positivo');
                            error = true;
                        }
                        if(error){
                            divErrores.innerHTML="";
                            let ulErrores = document.createElement('ul');
                            ulErrores.className='lista_errores';
                            for(let _error of arrayErrores){
                                let liError = document.createElement('li');
                                liError.textContent = _error;
                                ulErrores.append(liError);
                            }
                            divErrores.append(ulErrores);
                        }else{
                            let tallaCambiada = {"stock" : inputStock.value};
                            fetch(`/api/tallas/${talla.id}`, {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(tallaCambiada),
                            }).then((res) => {
                                listar('TALLAS');
                            });
                            divErrores.innerHTML="";
                        }
                    });
                }else if(nombre === 'PUBLICACIONES'){
                    let respMedia = await fetch(`/api/media/${e.target.value}`);
                    let media = await respMedia.json();
                    console.log(media);
                    let divInputs = document.createElement('div')
                    let inputLikes = document.createElement('input');
                    let inputDescription = document.createElement('input');
                    let divImageMedia = document.createElement('div');
                    let imgMedia = document.createElement('img');
                    
                    divInputs.classList.add('divInputs');
                    divImageMedia.classList.add('divImageMedia');

                    inputDescription.cols ="40";
                    inputDescription.rows ="5";
                    inputLikes.type = "text";
                    inputDescription.type = "text";
                    
                    inputLikes.value = media.likes;
                    inputDescription.value = media.description;
                    imgMedia.src = media.url
                    
                    divInputs.append('Likes: ',inputLikes,'Descripción: ',inputDescription,boton_enviar_cambios,divErrores)
                    divImageMedia.append(imgMedia);
                    bloqueEditar.append(divInputs, divImageMedia);

                    boton_enviar_cambios.addEventListener('click',(e)=>{
                        let arrayErrores = [];
                        let error = false;
                        if (inputLikes.value === '' || inputLikes.value === null || isNaN(inputLikes.value) || parseInt(inputLikes.value) < 0) {
                            arrayErrores.push('Error en los likes, debe ser un numero positivo');
                            error = true;
                        }
                        if(inputDescription.value === '' || inputDescription.value === null || inputDescription.value.length > 255){
                            arrayErrores.push('Error en la descripción de la publicación, por favor escríbalo bien');
                            error = true;
                        }
                        if(error){
                            divErrores.innerHTML="";
                            let ulErrores = document.createElement('ul');
                            ulErrores.className='lista_errores';
                            for(let _error of arrayErrores){
                                let liError = document.createElement('li');
                                liError.textContent = _error;
                                ulErrores.append(liError);
                            }
                            divErrores.append(ulErrores);
                        }else{
                            let publicacionCambiado = {"likes" : inputLikes.value,"description":inputDescription.value};
                            fetch(`/api/media/${media.id}`, {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(publicacionCambiado),
                            }).then((res) => {
                                listar('PUBLICACIONES');
                            });
                            divErrores.innerHTML="";
                        }
                    });
                }
            }
            getUserMediaProductsTallasAndOrders();
        });
    }
}


const makeProducts = async () => {
    makeProductsButton = document.querySelector('#crear-productos');
    makeProductsButton.addEventListener('click', (e) => {
        bloqueLista.innerHTML = "";
        articleEdicion.innerHTML = "";
        let carac = ['name', 'category', 'sex', 'brand', 'price', 'description', 'link'];

        for (let name of carac) {
            let div = document.createElement('div');
            div.className = "div_inputs_carac"
            let label = document.createElement('label');
            label.textContent = name;
            label.className = 'label_carac'
            let input = document.createElement('input');
            input.id = name;
            input.className = "input_carac";
            div.append(label, input);
            bloqueLista.append(div);
        }

        let stockContainer = document.createElement('div');
        stockContainer.id = 'stock-container';
        bloqueLista.append(stockContainer);

        let sendButton = document.createElement('button');
        sendButton.textContent = 'Crear Producto';
        sendButton.className = 'send_button';
        bloqueLista.append(sendButton, divErrores);

        document.querySelector('#category').addEventListener('change', (e) => {
            const category = e.target.value;
            stockContainer.innerHTML = ""; 

            let sizes = [];
            if (category === 'Zapatillas') {
                sizes = [36, 38, 40, 42, 44];
            } else {
                sizes = ['XS', 'S', 'M', 'L', 'XL'];
            }

            sizes.forEach(size => {
                let div = document.createElement('div');
                div.className = "div_inputs_carac"
                let label = document.createElement('label');
                label.textContent = `Stock para ${size}`;
                label.className = 'label_carac';
                let input = document.createElement('input');
                input.id = size;
                input.className = "input_carac";
                input.type = 'number';
                input.value = 0;
                input.setAttribute('data-talla', size);
                div.append(label, input);
                stockContainer.append(div);
            });
        });

        sendButton.addEventListener('click', (e) => {

            let inputName = document.querySelector('#name');
            let inputCategory = document.querySelector('#category');
            let inputSex = document.querySelector('#sex');
            let inputBrand = document.querySelector('#brand');
            let inputPrice = document.querySelector('#price');
            let inputDescription = document.querySelector('#description');
            let inputLink = document.querySelector('#link');

            const sendProductInformation = async () => {
                let resProductosLength = await fetch("/api/products");
                productosLong = await resProductosLength.json();
                let idProduct = productosLong.length + 1;

                let arrayErrores = [];
                let error = false;
                if (inputName.value === '' || inputName.value === null || inputName.value.length > 30) {
                    arrayErrores.push('Error en el nombre del producto, por favor escríbalo bien');
                    error = true;
                }
                if (inputCategory.value === '' || inputCategory.value === null || inputCategory.value.length > 25) {
                    arrayErrores.push('Error en la categoría del producto, por favor escríbalo bien');
                    error = true;
                }
                if (inputSex.value !== 'Hombre' && inputSex.value !== 'Mujer' && inputSex.value !== 'Unisex') {
                    arrayErrores.push('Error en el sexo del producto, por favor escríbalo bien ("Hombre", "Mujer" o "Unisex")');
                    error = true;
                }
                if (inputBrand.value === '' || inputBrand.value === null) {
                    arrayErrores.push('Error en la marca del producto, por favor escríbalo bien');
                    error = true;
                }
                if (inputPrice.value === '' || inputPrice.value === null || isNaN(inputPrice.value)) {
                    arrayErrores.push('Error en el precio del producto, por favor escríbalo bien');
                    error = true;
                }
                if (inputDescription.value === '' || inputDescription.value === null || inputDescription.value.length > 255) {
                    arrayErrores.push('Error en la descripción del producto, por favor escríbalo bien');
                    error = true;
                }
                if (inputLink.value === '' || inputLink.value === null) {
                    arrayErrores.push('Error en la URL del producto, por favor escríbalo bien');
                    error = true;
                }

                const stockInputs = stockContainer.querySelectorAll('input');
                let stockValues = {};
                stockInputs.forEach(input => {
                    if (input.value === '' || isNaN(input.value)) {
                        arrayErrores.push(`Error en el stock ${input.id}, por favor escríbalo bien`);
                        error = true;
                    } else {
                        stockValues[input.id] = input.value;
                    }
                });

                if (error) {
                    divErrores.innerHTML = "";
                    let ulErrores = document.createElement('ul');
                    ulErrores.className = 'lista_errores';
                    for (let _error of arrayErrores) {
                        let liError = document.createElement('li');
                        liError.textContent = _error;
                        ulErrores.append(liError);
                    }
                    divErrores.append(ulErrores);
                } else {
                    let producto = {
                        "name": inputName.value,
                        "category": inputCategory.value,
                        "sex": inputSex.value,
                        "brand": inputBrand.value,
                        "price": inputPrice.value,
                        "description": inputDescription.value,
                    };
                    console.log(producto);
                    fetch("/api/products", {
                        method: "POST",
                        headers: {
                            'X-CSRF-TOKEN': token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(producto),
                    });
                    stockInputs.forEach(async (input) =>{
                        let talla = input.getAttribute("data-talla");
                        let stock = input.value;
                        fetch("/api/tallas", {
                            method: "POST",
                            headers: {
                                'X-CSRF-TOKEN': token,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({"product_id": idProduct, "talla": talla, "stock": stock}),
                        });
                    })
                    console.log(idProduct);
                    console.log(inputLink.value);
                    fetch("/api/images", {
                        method: "POST",
                        headers: {
                            'X-CSRF-TOKEN': token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "product_id": idProduct, "url": inputLink.value }),
                    }).then((res) => {
                        inputName.value = '';
                        inputCategory.value = '';
                        inputSex.value = '';
                        inputBrand.value = '';
                        inputPrice.value = '';
                        inputDescription.value = '';
                        inputLink.value = '';
                        stockContainer.innerHTML = '';
                    });

                    
                }
            }
            sendProductInformation();
        });
    });
}

listar('USUARIOS');
botonUsuarios.addEventListener('click',(e) =>{
    listar('USUARIOS');
});

botonPedidos.addEventListener('click',(e) =>{
    listar('PEDIDOS');
});

botonProductos.addEventListener('click',(e) =>{
    listar('PRODUCTOS');
});

botonPublicaciones.addEventListener('click',(e) =>{
    listar('PUBLICACIONES');
});

makeProducts();
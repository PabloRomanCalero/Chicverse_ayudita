async function searchUsers() {
    let arrayUsers = await fetch('/api/users');
    let usersData = await arrayUsers.json();
    let buscadorUsers = document.getElementById("searchUser");
    let resultadosUsersDiv = document.getElementById("resultadosUsersDiv");
    let formSearchUser = document.getElementById("searchedUserForm");
    buscadorUsers.addEventListener("input", () => {
        
        let filtroU = buscadorUsers.value.trim().toLowerCase();
        let usersFiltrados = usersData.filter(user => (user.username).toLowerCase().startsWith(filtroU));
        if (usersFiltrados.length > 0) {
            resultadosUsersDiv.style.display = "block";    
            //vaciamos el div del autocomplete
            resultadosUsersDiv.innerHTML="";
            usersFiltrados.forEach(user => {
                let resultadoU = document.createElement("div");
                resultadoU.classList.add("resultadoU");
                resultadoU.textContent = user.username;

                resultadoU.addEventListener("click", () => {
                    resultadosUsersDiv.style.display = "none";
                    resultadosUsersDiv.innerHTML = ""; 
                    buscadorUsers.value = user.id;   
                    formSearchUser.submit();
                });

                resultadosUsersDiv.appendChild(resultadoU);
                if (filtroU == ''){
                    resultadosUsersDiv.style.display = "none";
                    resultadosUsersDiv.innerHTML="";
                };
            }); 
        };
       
    });
    
}
async function numCarrito(){
    let respOrderLines = await fetch('/api/orderLines');
    let orderLines = await respOrderLines.json();
    console.log(orderLines)
    if(orderLines === 'error'){
        console.log('no invitado');
    }else{
        console.log(orderLines);
        let numCarrito = document.querySelector('#numCarrito');
        let numeroCarrito = 0;
        orderLines.forEach(linea =>{
            numeroCarrito = numeroCarrito + linea.quantity;
        });
        numCarrito.textContent = numeroCarrito;
    }
}
searchUsers();
numCarrito();
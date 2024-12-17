async function inicializar() {
    let arrayProductos = await fetch('api/products');
    let productsData = await arrayProductos.json();
    let buscador = document.getElementById("buscador");
    let resultadosDiv = document.getElementById("resultadosDiv");

    buscador.addEventListener("input", () => {
        
        let filtro = buscador.value.trim().toLowerCase();
        let resultadosFiltrados = productsData.filter(producto => (producto.name).toLowerCase().startsWith(filtro));
        if (resultadosFiltrados.length > 0) {
            resultadosDiv.style.display = "block";    
            //vaciamos el div del autocomplete
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
                resultadosDiv.appendChild(resultadoP);
                if (filtro == ''){
                    resultadosDiv.style.display = "none";
                    resultadosDiv.innerHTML="";
                };
            }); 
        };
        
    });
}
inicializar();

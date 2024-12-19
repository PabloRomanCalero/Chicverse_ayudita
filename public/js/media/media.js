async function inicializar() {
    let arrayProductos = await fetch('api/products');
    let productsData = await arrayProductos.json();
    let buscador = document.getElementById("buscador");
    let resultadosDiv = document.getElementById("resultadosDiv");
    let botonForm = document.getElementById("botonForm");
    document.getElementById('file').addEventListener('change', function () {
        const progressBar = document.getElementById('progressBar');
        let progress = 0;
    
        if (this.files.length > 0) {
            progressBar.style.width = '0%';
            progressBar.textContent = '0%';
    
            const interval = setInterval(() => {
                if (progress >= 100) {
                    clearInterval(interval);
                    progressBar.textContent = 'Archivo listo para subir';
                    botonForm.disabled = false;
                } else {
                    progress += 10; 
                    progressBar.style.width = `${progress}%`;
                    progressBar.textContent = `${progress}%`;
                }
            }, 100); 
        }
    });

    buscador.addEventListener("input", () => {
        
        let filtro = buscador.value.trim().toLowerCase();
        let resultadosFiltrados = productsData.filter(producto => (producto.name).toLowerCase().startsWith(filtro));
        if (resultadosFiltrados.length > 0) {
            resultadosDiv.style.display = "block";    

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

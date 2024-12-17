document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown > a");
    const submenu = document.querySelector(".submenu");

    dropdown.addEventListener("click", function (event) {
        event.preventDefault();
        submenu.style.display = submenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target) && !submenu.contains(event.target)) {
            submenu.style.display = "none";
        }
    });
    async function numCarrito(){
        let respOrderLines = await fetch('/api/orderLines');
        let orderLines = await respOrderLines.json();
        
        let numCarrito = document.querySelector('#numCarrito');
        let numeroCarrito = 0;
        if(orderLines.length > 0 && orderLines != "error" && orderLines != "no hay order"){
            orderLines.forEach(linea =>{
                numeroCarrito = numeroCarrito + linea.quantity;
            });
        }  
        numCarrito.textContent = numeroCarrito;
        
    }
    numCarrito();
});

// Consigue aqui los datos anda
var tbody = document.getElementById("tbody-estadoPedidos")

var json = {
    "0": { "id": 0, "Name": "Zapatillas", "Estado": 0, "Fecha": "2024-12-16" },
    "1": { "id": 1, "Name": "Camisa", "Estado": 1, "Fecha": "2024-12-17" },
    "2": { "id": 2, "Name": "Pantalones", "Estado": 2, "Fecha": "2024-12-18" },
    "3": { "id": 3, "Name": "Chaqueta", "Estado": 0, "Fecha": "2024-12-19" },
    "4": { "id": 4, "Name": "Gorro", "Estado": 1, "Fecha": "2024-12-20" },
    "5": { "id": 5, "Name": "Guantes", "Estado": 2, "Fecha": "2024-12-21" },
    "6": { "id": 6, "Name": "Bufanda", "Estado": 1, "Fecha": "2024-12-22" },
    "7": { "id": 7, "Name": "Botines", "Estado": 0, "Fecha": "2024-12-23" },
    "8": { "id": 8, "Name": "Mochila", "Estado": 2, "Fecha": "2024-12-24" },
    "9": { "id": 9, "Name": "Cinturón", "Estado": 1, "Fecha": "2024-12-25" }
};
function obtenerEstadoTexto(estado) {
    switch (estado) {
        case 0:
            return "Correcto";
        case 1:
            return "Pendiente";
        case 2:
            return "Fallido";
        default:
            return "Desconocido";
    }
}

for (var key in json) {
    var row = json[key];
    var tr = document.createElement('tr');
    for (var field in row) {
        console.log(field)
        var td = document.createElement('td');

        if (field === 'Estado') {
            td.textContent = obtenerEstadoTexto(row[field]);
        } else {
            td.textContent = row[field];
        }
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
}


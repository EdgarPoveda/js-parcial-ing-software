function startLiveUpdate() {
    //Consultar el html a modificar
    let contador = 0;
    setInterval(function() {
        fetch('http://localhost:8090/usuarios/obtenerusuarios').then(function(response) {
            return response.json();
        }).then(function(data) {
            contador += 1;
            console.log('consumos : ' + contador);
            var element = document.getElementById("tasklist");
            console.log(element);
            if (element != null) {
                element.parentNode.removeChild(element);
                let divTabla = document.createElement("div");
                divTabla.setAttribute("id", "tasklist");
                document.body.appendChild(divTabla);
            }

            let tbl = document.createElement("table");
            tbl.setAttribute("id", "reporte");
            let tblHead = document.createElement("thead");
            let cabeceras = document.createElement("tr");
            let tdconsumos = cabeceras.appendChild(document.createElement('td'));
            tdconsumos.appendChild(document.createTextNode("#Consumos"));
            let tdnombre = cabeceras.appendChild(document.createElement('td'));
            tdnombre.appendChild(document.createTextNode("nombres"));
            let tdapellido = cabeceras.appendChild(document.createElement('td'));
            tdapellido.appendChild(document.createTextNode("apellidos"));
            let tddocuemnto = cabeceras.appendChild(document.createElement('td'));
            tddocuemnto.appendChild(document.createTextNode("documento"));
            tblHead.appendChild(cabeceras);
            let tblBody = document.createElement("tbody");
            data.forEach(elem => {
                console.log(elem);
                let row = document.createElement("tr");
                let td0 = row.appendChild(document.createElement('td'));
                td0.appendChild(document.createTextNode(contador));
                let td = row.appendChild(document.createElement('td'));
                td.appendChild(document.createTextNode(elem.nombres));
                let td2 = row.appendChild(document.createElement('td'));
                td2.appendChild(document.createTextNode(elem.apellidos));
                let td3 = row.appendChild(document.createElement('td'));
                td3.appendChild(document.createTextNode(elem.identificacion));
                tblBody.appendChild(row);
            });
            tbl.appendChild(tblHead);
            tbl.appendChild(tblBody);
            //document.body.appendChild(tbl);

            document.getElementById("tasklist").appendChild(tbl);
            $('#reporte').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        }).catch(function(error) {

            console.log(error + error);
        });
    }, 2000);

}

document.addEventListener('DOMContentLoaded', function() {
    $('#reporte').DataTable();
    startLiveUpdate();

});
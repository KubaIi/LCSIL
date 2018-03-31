$ = jQuery;



function template(id, name, imgUrl, buyPrice, sellPrice) {
    return "<tr>" +
        "<td>" + id + "</td>" +
        "<td>" + name + "</td>" +
        "<td><img src='" + imgUrl + "'/></td>" +
        "<td>" + buyPrice + "</td>" +
        "<td>" + sellPrice + "</td>" +
        "</tr>";
}

function JSON2CSV(objArray) {

    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var line = '';

    if ($("#labels").is(':checked')) {
        var head = array[0];
        if ($("#quote").is(':checked')) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[0]) {
                line += index + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

        if ($("#quote").is(':checked')) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}
window.allItems = [];
$(function () {

    $("#dump").click(function () {

        var csv = JSON2CSV(window.allItems);
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "data.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    var table = $('#infoTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    } );



    $("#getData").click(function () {
        $.get('/getItemInfo', {
            serialNumber: $("#modelNo").val()
        }, function (res) {
            console.log(res);
            res.sellPrice = $('#sellPrice').val();
            res.buyPrice = $('#buyPrice').val();
            res.profitmargin = (res.sellPrice / res.buyPrice).toFixed(2);
            res.dim_x = parseFloat(res.dim_x).toFixed(0);
            res.dim_y = parseFloat(res.dim_y).toFixed(0);
            res.dim_z = parseFloat(res.dim_z).toFixed(0);
            window.allItems.push(res);
            //$("#InnerTable").append(template(res.no, res.name, res.image_url, res.buyPrice, res.sellPrice));

            var rowNode = table
                .row.add([res.no, res.name, "<img src='" + res.image_url + "'/>" , "₪"+res.buyPrice, "₪"+res.sellPrice, res.profitmargin, res.category_id, res.dim_x,res.dim_y,res.dim_z,res.weight,res.year_released])
                .draw()
                .node();
        });
    });
    $('#infoTable').on( 'click', 'tbody td', function () {
        table.cell(this).edit( {
            blur: 'submit'
        } );
    } );
});


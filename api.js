let scores = [];

function api() {
    let html = "";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pruebasjulioj.000webhostapp.com/apiScore/', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            scores = JSON.parse(xhr.responseText);
            for (let index = 0; index < 5; index++) {
                if (scores[index] != undefined) {
                    html += "<tr>"
                    if (index == 0) html += "<td> <img src='1.png'></td>"
                    else if (index == 1) html += "<td> <img src='2.png'></td>"
                    else if (index == 2) html += "<td> <img src='3.png'></td>"
                    else html += "<td>" + index + "</td>"
                    html += "<td>" + scores[index]["name"] + "</td>"
                    html += "<td>" + scores[index]["score"] + "</td>"
                    html += "<td>" + scores[index]["date"] + "</td>"
                    html += "</tr>"
                }
            }
            $("#hallfame").html(html);
        } else {
            console.log('Error en la solicitud');
        }
    };
    xhr.send();
}

function HallOfFame(arr) {
    console.log(arr)
    fetch('https://pruebasjulioj.000webhostapp.com/apiScore/?n=' + arr['name'] + '&s=' + arr['score'] + '&as=' + arr['old'])
        .then(response => response.json())
        .then(data => console.log(data + api())
        )
        .catch(error => console.error(error));

}

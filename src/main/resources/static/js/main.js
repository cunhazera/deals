$("#submit").click(function(e) {
    var stage = $("#stage").val();
    var initial = $("#datepicker1").val();
    var end = $("#datepicker2").val();
    var negotiations = $("#negotiations option:selected").index();

    Date.prototype.getWeek = function () {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };

    var initialWeek = new Date(initial).getWeek();
    var endWeek = new Date(end).getWeek();

    var url;
    if (negotiations == 1) {
        url = '/api/deals?initial=' + initialWeek + '&end=' + endWeek + '&stage=' + stage;
    } else if (negotiations == 2) {
        url = '/api/deals/unmoved?initial=' + initialWeek + '&end=' + endWeek + '&stage=' + stage;
    }

    request(url, negotiations);
});

function processTotalUnmoved(items, level, element) {
    clearHtml();
    $(element).append('<ul class="list-group">');
    for (var i = 0; i<items.length; i++ ) {
        $(element).append('<li class="list-group-item d-flex justify-content-between align-items-center">'+items[i].stage+
            '<span class="badge badge-primary badge-pill">'+items[i].totalInStages+'</span></li>');
    }
    $(element).append('</ul>');
}

function processDeals(items, level, element) {
    clearHtml();

    $(element).append('<thead> <tr> <th scope="col">Linha</th> <th scope="col">ID</th> <th scope="col">Negociação</th> <th scope="col">Status</th> <th scope="col">Usuário</th> </tr> </thead>');
    $(element).append('<tbody>');
    var markup = "<tr><th scope='row'>${nrow}</th><td>${id}</td><td>${id}</td><td>${status}</td><td>${user}</td></tr>";

    for (var i = 0; i<items.length; i++ ) {
        $.tmpl(markup, { "nrow" : i +1, "id":items[i].id, "deal":items[i].dealName, "status":items[i].status, "user":items[i].userName  }).appendTo(element);
    }
    $(element).append('</tbody>');
    
}

function clearHtml() {
    if ($('#deals').text().trim() != '') {
        document.getElementById('deals').innerHTML = '';
    }
    if ($('#list').text().trim() != '') {
        document.getElementById('list').innerHTML = '';
    }
}

function request(url, negotiations) {
    $.ajax({
        type: "GET",
        url: url,
        crossDomain: true,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            if (negotiations == 1) {
                processDeals(data, 0, '#deals');
            } else if (negotiations == 2) {
                processTotalUnmoved(data, 0, '#list');
            }
        },
        error: function(){
            console.log("naaaaaaaao");
        }
    });
}
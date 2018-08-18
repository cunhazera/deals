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

    $.ajax({
        type: "GET",
        url: url,
        crossDomain: true,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            if (negotiations == 1) {
                
            } else if (negotiations == 2) {
                processTotalUnmoved(data, 0, '#list');
            }
        },
        error: function(){
            console.log("naaaaaaaao");
        }
    });
});

function processTotalUnmoved(items, level, element) {
    if ($('#list').text().trim() != '') {
        document.getElementById('list').innerHTML = '';
    }
    $(element).append('<ul></ul>');
    for (var i = 0; i<items.length; i++ ) {
        $(element + '> ul' ).append('<li class="' + level + '-' + i + '"> <img height="10" width="10" style="background:' + items[i].stage +'">' + (items[i].stage ? items[i].stage : items[i].stage) + '<span style="float:right">'+ (items[i].totalInStages ? items[i].totalInStages : "") +'</span></li>');
    }
}

function processDeals(items, level, element) {
    if ($('#list').text().trim() != '') {
        document.getElementById('list').innerHTML = '';
    }
    $(element).append('<ul></ul>');
    for (var i = 0; i<items.length; i++ ) {
        $(element + '> ul' ).append('<li class="' + level + '-' + i + '"> <img height="10" width="10" style="background:'
            + items[i].userName +'">' + (items[i].userName ? items[i].userName : items[i].userName) +
            '<span style="float:right">'+ (items[i].dealName ? items[i].dealName : "") +'</span></li>');
    }
}

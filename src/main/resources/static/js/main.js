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
                processDeals(data, 0, '#list');
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
    $(element).append('<ul>');
    for (var i = 0; i<items.length; i++ ) {
        $(element).append('<li><p>'+items[i].stage+':'+ items[i].totalInStages + '</p></li>');
    }
    $(element).append('</ul>');
}

function processDeals(items, level, element) {
    if ($('#list').text().trim() != '') {
        document.getElementById('list').innerHTML = '';
    }
    $(element).append('<ul>');
    for (var i = 0; i<items.length; i++ ) {
        $(element).append('<li><p>'+items[i].id +'|'+ items[i].dealName + '|' + items[i].status + '|' + items[i].userName + '</p></li>');
    }
    $(element).append('</ul>');
}

var activities = document.getElementById("select1");

activities.addEventListener("click", function() {
    var options = activities.querySelectorAll("option");
    var count = options.length;
    if(typeof(count) === "undefined" || count < 2)
    {
        console.log("aaaaaaaaaaaaaaaaaa");
    }
});
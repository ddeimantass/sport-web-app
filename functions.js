function changeMain(column, table){
    var current = table.find("th:nth-child("+(column+1)+")"); 
    var length = table.find("th").length;
    var sub;
    var main = table.find("th.main");
    table.find("th.sub"+(length-1)).removeClass("sub"+(length-1));
    for(var i = (length - 2); i > 0; i--){
        sub = table.find("th.sub"+i);
        sub.removeClass("sub"+i);
        sub.addClass("sub"+(i+1));
        current.removeClass("sub"+(i+1));
    }
    main.removeClass("main");
    main.addClass("sub1");
    current.removeClass("sub1");
    current.addClass("main");
    
}
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}
function asc(v1, v2){
    if($.isNumeric(v1) && $.isNumeric(v2)){
        return Number(v1) > Number(v2);
    }
    else{
        return v1 > v2;
    }
}
function desc(v1, v2){
    if($.isNumeric(v1) && $.isNumeric(v2)){
        return Number(v1) < Number(v2);
    }
    else{
        return v1 < v2;
    }
}
function multiSubSort(table, num){
    if(table.find("th.sub"+num).length != 0){
        var column = table.find("th").index($("th.sub"+num));
        var rows = table.find("tr");
        var mainColumn = table.find("th").index($("th.main"));
        var mainCells = table.find("tr td:nth-child("+(mainColumn+1)+")");
        var subColumn = [];
        var subCells = [];
        for(var i = 1; i < num ; i++){
            subColumn.push(table.find("th").index($("th.sub"+i)));
            subCells.push(table.find("tr td:nth-child("+(subColumn[i-1]+1)+")"));
        }
        do{
            var cells = table.find("tr td:nth-child("+(column + 1)+")");
            var switched = false;
            for (var i = 0; i < (cells.length - 1); i++) {
                var needSwitch = false;
                mv1 = $(mainCells[i]).text().toLowerCase();
                mv2 = $(mainCells[i+1]).text().toLowerCase();
                sv1 = [];
                sv2 = [];
                for(var j = 1; j < num ; j++){
                    sv1.push($(subCells[i]).text().toLowerCase());
                    sv2.push($(subCells[i+1]).text().toLowerCase());
                }
                if(mv1 == mv2 && arraysEqual(sv1, sv2)){
                    v1 = $(cells[i]).text().toLowerCase();
                    v2 = $(cells[i+1]).text().toLowerCase();
                    if (table.find(".sub1").hasClass("asc"))
                        needSwitch = asc(v1, v2);
                    else
                        needSwitch = desc(v1, v2);
                }
                if (needSwitch) {
                    v1 = $(rows[i+1]).html();
                    $(rows[i+1]).html($(rows[i+2]).html());
                    $(rows[i+2]).html(v1)
                    switched = true;
                }
            }
        }while(switched);
    }
    if((num + 1) < table.find("th").length){
       multiSubSort(table , (num + 1))
    }
}
function subSort(table, column){
    var rows = table.find("tr");
    var mainColumn = table.find("th").index($("th.main"));
    var mainCells = table.find("tr td:nth-child("+(mainColumn+1)+")");
    do{
        var cells = table.find("tr td:nth-child("+(column + 1)+")");
        var switched = false;
        for (var i = 0; i < (cells.length - 1); i++) {
            var needSwitch = false;
            mv1 = $(mainCells[i]).text().toLowerCase();
            mv2 = $(mainCells[i+1]).text().toLowerCase();
            if(mv1 == mv2){
                v1 = $(cells[i]).text().toLowerCase();
                v2 = $(cells[i+1]).text().toLowerCase();
                if (table.find(".sub1").hasClass("asc"))
                    needSwitch = asc(v1, v2);
                else
                    needSwitch = desc(v1, v2);
            }
            if (needSwitch) {
                v1 = $(rows[i+1]).html();
                $(rows[i+1]).html($(rows[i+2]).html());
                $(rows[i+2]).html(v1)
                switched = true;
            }
        }
    }while(switched);
    if(2 < table.find("th").length){
       multiSubSort(table , 2)
    }
}
function mainSort(table, column){
    var rows = table.find("tr");
    do{
        var cells = table.find("tr td:nth-child("+(column + 1)+")");
        var switched = false;
        for (var i = 0; i < (cells.length - 1); i++) {
            var needSwitch = false;
            v1 = $(cells[i]).text().toLowerCase();
            v2 = $(cells[i+1]).text().toLowerCase();
            if (table.find(".main").hasClass("asc"))
                needSwitch = asc(v1, v2);
            else
                needSwitch = desc(v1, v2);
            if (needSwitch) {
                v1 = $(rows[i+1]).html();
                $(rows[i+1]).html($(rows[i+2]).html());
                $(rows[i+2]).html(v1)
                switched = true;
            }
        }
    }while(switched);
    if(table.find("th.sub1").length != 0){
        multiColumnSort(table.find("th.sub1"), false);
    }
}
function multiColumnSort(head, main){
    var table = head.parents("table");
    var column = table.find("th").index(head);
    if(main && head.hasClass("asc")){
        head.removeClass("asc");
        head.addClass("desc");
    }
    else if(main){
        head.removeClass("desc");
        head.addClass("asc");
    }
    if(main && !head.hasClass("main")){
        changeMain(column, table)
    }
    if(main){
        mainSort(table, column);
    }
    else{
        subSort(table, column);
    }
}
$(document).ready(function(){
    $("#matches th").click(function(){
        multiColumnSort($(this), true);
    });
});
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("matches");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++; 
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
$(document).ready(function(){
    $("#matches th").click(function(){
        switch($(this).attr("id")){
            case "date":  sortTable(0); break;
            case "teamA": sortTable(1); break;
            case "teamB": sortTable(2); break; 
            case "score": sortTable(3); break; 
        }
        if($(this).hasClass("asc")){
            $(this).removeClass("asc");
            $(this).addClass("desc");
        }
        else{
            $("#matches th.asc").removeClass("asc");
            $("#matches th.desc").removeClass("desc");
            $(this).addClass("asc");
        }
    });
});
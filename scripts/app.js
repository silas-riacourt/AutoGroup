chrome.storage.sync.get(["year", "group"], function (results) {

    var group = results.group;
    var year = results.year;

    document.getElementById("year_select").value = year;
    loadGroupSelect();
    document.getElementById("group_select").value = group;
    
});

document.getElementById("savebtn").addEventListener("click", saveData);
document.getElementById('year_select').addEventListener("change", loadGroupSelect);
function createOption(object,Name,label){
    var option = document.createElement("option");
    option.text = label;
    option.value = Name;
    object.add(option);
}
function loadGroupSelect() {

    var selectobject = document.getElementById("group_select");
    selectobject.selectedIndex = -1;
    selectobject.options.length = 0;

    if (document.getElementById("year_select").value == 1) {
        createOption(selectobject,"F1","F1");
        createOption(selectobject,"F2","F2");
        createOption(selectobject,"G1","G1");
        createOption(selectobject,"G2","G2");
        createOption(selectobject,"H1","H1");
        createOption(selectobject,"H2","H2");
        createOption(selectobject,"I1","I1");
        createOption(selectobject,"I2","I2");
        createOption(selectobject,"J1","J1");
        createOption(selectobject,"J2","J2");

    }else {
        createOption(selectobject,"A1","A1");
        createOption(selectobject,"A2","A2");
        createOption(selectobject,"B1","B1");
        createOption(selectobject,"B2","B2");
        createOption(selectobject,"C1","C1");
        createOption(selectobject,"C2","C2"); 
        createOption(selectobject,"D1","D1");
        createOption(selectobject,"D2","D2");  
    }
}

function saveData() {

    var group_select = document.getElementById("group_select");
    //  var group_value = group_select.options[group_select.selectedIndex].value;

    var year_select = document.getElementById("year_select");
    //var year_value = year_select.options[year_select.selectedIndex].value;

    chrome.storage.sync.set({
        "year": year_select.value,
        "group": group_select.value
    });

}
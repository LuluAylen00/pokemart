let actualRegion = "citiesFrom" + 0;

function valid(obj) {
    if (obj.value == "") {
        actualRegion = "citiesFrom" + 0;
        return false;
    } else {
        actualRegion = "citiesFrom" + obj.value;
        return true;
    };
}

function hideOpt(option) {
    option.disabled = true;
}
function showOpt(option) {
    option.disabled = false;
}

function checkCity(){
    let allOptions = document.querySelectorAll(".options");
    allOptions.forEach(option => {
        hideOpt(option);
    })
    let newOptions = document.querySelectorAll("."+ actualRegion);
    newOptions.forEach((option) => {
        showOpt(option);
    })
}

let region = document.getElementById("region-select");
function check(){
    if (valid(region)) {
        checkCity();
        document.getElementById("city-select").disabled = false;
    } else {
        document.getElementById("city-select").disabled = true;
    }
}
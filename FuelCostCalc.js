//____________________________
//Program   : FuelCostCalc.js
//Author    : Ben Morgan
//Date      : 6/16/2014
//Purpose   : Create a fuel cost calculator that will take in variables and compare two different autos at different levels of fuel consumption.
//Updated   : 
//Last Run  :   
//____________________________

function FuelCostCalc(type) {

if (type === "example") {
    //pre-populate values for example
    document.getElementById("VehicleMiles").value = 12000; 
    document.getElementById("VehicleLife").value = 5; 
    document.getElementById("FuelPrice").value = 3.50; 
    document.getElementById("Price1").value = 6000; 
    document.getElementById("Price2").value = 3000; 
    document.getElementById("Mpg1").value = 25; 
    document.getElementById("Mpg2").value = 20; 
}

//get variable values
var VehicleMiles = document.getElementById("VehicleMiles").value; //miles per year
var VehicleLife = document.getElementById("VehicleLife").value; //lifetime in years
var FuelPrice = document.getElementById("FuelPrice").value; //fuel price
//vehicle-specific
var Price1 = document.getElementById("Price1").value; //vehicle 1 price
var Price2 = document.getElementById("Price2").value; //vehicle 2 price
var Mpg1 = document.getElementById("Mpg1").value; //vehicle 1 mpg
var Mpg2 = document.getElementById("Mpg2").value; //vehicle 2 mpg
    
//verify input
var errMsg = VerifyInput(VehicleMiles, VehicleLife, FuelPrice, Price1, Price2, Mpg1, Mpg2);

if (errMsg) {
    confirm(errMsg);
    return;
}

//calculate results
var AnnualFuelCost1 = calcAnnualFuelCost(VehicleMiles, Mpg1, FuelPrice);
var AnnualFuelCost2 = calcAnnualFuelCost(VehicleMiles, Mpg2, FuelPrice);
var LifetimeFuelCost1 = calcLifetimeFuelCost(AnnualFuelCost1, VehicleLife);
var LifetimeFuelCost2 = calcLifetimeFuelCost(AnnualFuelCost2, VehicleLife);
var CompleteCost1 = calcCompleteCost(LifetimeFuelCost1, Price1);
var CompleteCost2 = calcCompleteCost(LifetimeFuelCost2, Price2);
var YearlyTotalArray1 = calcYearlyRunningTotal(Price1, AnnualFuelCost1, VehicleLife);
var YearlyTotalArray2 = calcYearlyRunningTotal(Price2, AnnualFuelCost2, VehicleLife);

//display results
var tblHeader = '<table border="1"> <tr> <th>Output </th> <th>Vehicle 1</th> <th>Vehicle 2</th> </tr>';
var tblFooter = '</table>';
var tblAfc = '<tr> <td>Annual Fuel Cost: </td> <td>$' + AnnualFuelCost1 + '</td> <td>$' + AnnualFuelCost2 + '</td> </tr>'; //annual fuel cost display
var tblLfc = '<tr> <td>Lifetime Fuel Cost: </td> <td>$' + LifetimeFuelCost1 + '</td> <td>$' + LifetimeFuelCost2 + '</td> </tr>'; //lifetime fuel cost display
var tblCc = '<tr> <td>Complete Cost: </td> <td>$' + CompleteCost1 + '</td> <td>$' + CompleteCost2 + '</td> </tr>'; //complete cost display
var tblYta = ''; //yearly total array (will be filled by loop)
for (var i = 0; i < YearlyTotalArray1.length; i++) { //gather yearly running totals from array
    tblYta = tblYta + '<tr> <td>Running Total - Year ' + (i + 1) + '</td> <td>$' + YearlyTotalArray1[i] + '</td> <td>$' + YearlyTotalArray2[i] + '</td> </tr>';;
}

document.getElementById("Results").innerHTML = tblHeader + tblAfc + tblLfc + tblCc + tblYta + tblFooter;
};

function VerifyInput(miles, life, fuelPrice, vPrice1, vPrice2, vMpg1, vMpg2) {

if (! miles) {
    return "Please enter a valid number of miles driven per year.";
}
if (miles <= 0) {
    return "Please enter a valid number of miles driven per year.";
}
if (! life) {
    return "Please enter a valid number of years you expect to keep the car.";
}
if (life <= 0) {
    return "Please enter a valid number of years you expect to keep the car.";
}
if (! fuelPrice) {
    return "Please enter a valid fuel price.";
}
if (fuelPrice <= 0) {
    return "Please enter a valid fuel price.";
}
if (! vPrice1) {
    return "Please enter a valid price for vehicle 1.";
}
if (vPrice1 <= 0) {
    return "Please enter a valid price for vehicle 1.";
}
if (! vPrice2) {
    return "Please enter a valid price for vehicle 2.";
}
if (vPrice2 <= 0) {
    return "Please enter a valid price for vehicle 2.";
}
if (! vMpg1) {
    return "Please enter a valid MPG for vehicle 1.";
}
if (vMpg1 <= 0) {
    return "Please enter a valid MPG for vehicle 1.";
}
if (! vMpg2) {
    return "Please enter a valid MPG for vehicle 2.";
}
if (vMpg2 <= 0) {
    return "Please enter a valid MPG for vehicle 2.";
}
};

function calcAnnualFuelCost(miles, mpg, price) {
    return (Number(miles) / Number(mpg)) * Number(price);
};

function calcLifetimeFuelCost(AnnualCost, years) {
    return Number(AnnualCost) * Number(years);
};

function calcCompleteCost(FuelCost, price) {
    return Number(FuelCost) + Number(price);
};

function calcYearlyRunningTotal(price, AnnualCost, years) {
    var totals = []; //array to hold all totals
    var curTotal = 0; //holds current total
    for (var i = 1; i <= years; i++) {
        if (i === 1) { //check whether this is the first year
            curTotal = Number(price) + Number(AnnualCost);
            totals.push(curTotal);
        }
        else {
            curTotal = Number(curTotal) + Number(AnnualCost);
            totals.push(curTotal);
        }
    }
return totals;
};
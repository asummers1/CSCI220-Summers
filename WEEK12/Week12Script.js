// JavaScript Document
$("#workerForm").submit( function() {
	inputs = $(":input").not(":input[type=button]");
	addToList(inputs);
});

//Sorting code taken from: https://stackoverflow.com/a/19947532/11813067
$('th').click(function(){
    var table = $(this).parents('table').eq(0)
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.asc = !this.asc
    if (!this.asc){rows = rows.reverse()}
    for (var i = 0; i < rows.length; i++){table.append(rows[i])}
})
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).text() }

function addToList(inputs)
	{

		$("#tableToAddTo tbody").append("<tr><td>" + inputs[0].value + "</td><td>" + inputs[1].value + "</td><td>" + inputs[2].value + "</td></td>"); //Adds the three values to the table. JS arrays are zero-indexed.

		clearInput(inputs);
	}
function clearInput(inputs)
	{
		inputs.each(function() //Goes through each element in "inputs"
				    {
			          $(this).val(""); //Clears out the input boxes
					})

	
	}

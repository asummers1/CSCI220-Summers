// JavaScript Document
$("#workerForm").submit( function() {
	var inputs = $(":input:not(:button)");
	addToList(inputs);
});

$(document).ready(function(){$("#tableToAdd").DataTable();});
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
<<<<<<< HEAD
		$("#tableToAddTo tbody").append("<tr>") //Beginning of table row
		for (var i = 0; i < inputs.length; i++)
			{
				
				$("#tableToAddTo tbody").append("<td>" + inputs[i].value + "</td>"); //Contents of table row
			}
		$("#tableToAddTo tbody").append("</tr>"); //End of table row
		
=======
		$("#tableToAddTo tbody").append("<tr><td>" + inputs[0].value + "</td><td>" + inputs[1].value + "</td><td>" + inputs[2].value + "</td></tr>"); //Adds the three values to the table. JS arrays are zero-indexed.
>>>>>>> fdd3814fe0faf8d39baca0a1638dc2361cf1c410
		
		clearInput(inputs);
	}
function clearInput(inputs)
	{
		inputs.each(function() //Goes through each element in "inputs"
				    {
			          $(this).val(""); //Clears out the input boxes
					})

	
	}

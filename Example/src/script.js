function jsonToHTMLTable(parsedJson,headingType){
	var tableHeaders = new Array();
	if(headingType == "horizontal"){
		for(var i = 0 ;i < parsedJson.length ; i++){
			for( var j = 0 ; j < Object.keys(parsedJson[i]).length ; j++){
				if(tableHeaders.indexOf(Object.keys(parsedJson[i])[j]) == -1 )
					tableHeaders.push(Object.keys(parsedJson[i])[j]);
			}
		}
		var headersHtml = "<thead> <tr>";
		var footersHtml = "<tfoot> <tr>";
		for( var k = 0; k < tableHeaders.length ; k++){
			headersHtml += "<th>"+tableHeaders[k]+"</th>";
			footersHtml+= "<th>"+tableHeaders[k]+"</th>";
		}
		headersHtml+="</tr> </thead>";
		footersHtml += "</tr> </tfoot>";

		var rows="<tbody>";
		for(var l = 0 ;l < parsedJson.length ; l++){
			rows += "<tr>";
			//rows += `<td> <button onclick=\"btnClick(${data})\" class="button-75" role="button"> <span class="text"> View Graph </span> </button> </td>`;
			for( var m = 0 ;m < tableHeaders.length ; m++){
				if(typeof parsedJson[l][tableHeaders[m]] == 'undefined')
					rows += "<td></td>";
				else
				rows += "<td>"+  parsedJson[l][tableHeaders[m]]  +"</td>";
			}
			rows += "</tr>";
		}
		rows+= "</tbody>";
		var horizontal_table= "<table id=\"example\" class=\"table table-striped\" style=\"width: 100%\"> <thead> </thead> <tbody> </tbody> <tfoot> </tfoot>"+headersHtml+rows+"</table>";
	return headersHtml+rows+footersHtml;
	}
	else if(headingType == "vertical"){
		for(var i = 0 ;i < parsedJson.length ; i++){
			for( var j = 0 ; j < Object.keys(parsedJson[i]).length ; j++){
				if(tableHeaders.indexOf(Object.keys(parsedJson[i])[j]) == -1 )
					tableHeaders.push(Object.keys(parsedJson[i])[j]);
			}
		}

		var rows="";
		for( var k = 0 ;k < tableHeaders.length ; k++){
			rows += "<tr>";
			for(var l = 0 ;l < parsedJson.length ; l++){
				if(l == 0)
					rows += "<th>"+tableHeaders[k] +"</th>";
				if(typeof parsedJson[l][tableHeaders[k]] == 'undefined')
					rows += "<td></td>";
				else
					rows += "<td>"+  parsedJson[l][tableHeaders[k]] +"</td>";
			}
			rows += "</tr>";
		}

		var vertical_table= "<table id=\"example\" class=\"table table-striped\" style=\"width: 100%\"> <thead> </thead> <tbody> </tbody> <tfoot> </tfoot>"+rows+"</table>";
	return vertical_table;
	}
}
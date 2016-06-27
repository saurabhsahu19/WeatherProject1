var app = (function(){
	var getWeatherData = function() {
		//return $.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=7&appid=fbfaa670d58ef1bd46a0d50351982274");
		var city = document.getElementById('selectCity').value;
		console.log("city is "+city);
		var url = "Weather/wow?city="+city;
		return $.get(url/*,{city:"London"}*/);
	}
	
	var processData = function (data) {
		var resultArray = [];		
		var ob = {
				x: ["time"],
				y: ["temp"]
		}
		for(var i = 0; i < data.length ; i++) {
			var item = data[i];
			createDataObj(item.temp, ob);
		}

		//console.log(ob);
		var i = 0 ;
		var chart = c3.generate({
		    data: {
		    	x: 'time',
		        columns: [
		            ob.x,      		
		            ob.y
		        ]
		    },
		    axis: {
		        x: {
		            type: 'time',
		            tick: {
		                format: function(d) {
//		                	if (i % 24 == 0)
//		                		return "night";
//		                	else if (i % 24 == 6)
//		                		return "morn";
//		                	else if (i % 24 == 12)
//		                		return "noon";
//		                	else if (i % 24 == 18)
//		                		return "evening";
		                	if (d%24 == 0)
		                		return "12am";
		                	else if (d%24 == 6)
		                		return "6am";
		                	else if (d%24 == 12)
		                		return "12pm";
		                	else 
		                		return "6pm";
		                }
		            }
		        }
		    }
		});
		
//		setTimeout(function () {
//		    chart.load({
//		        columns: [
//		            ob.x
//		        ]
//		    });
//		}, 1000);

//		setTimeout(function () {
//		    chart.load({
//		        columns: [
//		            ob.y
//		        ]
//		    });
//		}, 1500);
//
//		setTimeout(function () {
//		    chart.unload({
//		        ids: 'data1'
//		    });
//		}, 2000);

	}
	
	var createDataObj = function(data, obArray) {
		
		var time = 0;
		
		$.each(data, function(index, value) {
//			console.log(index);
//			if (index < 4) {
			obArray.y.push(value);
			if(obArray.x.length == 1) {
				obArray.x.push(time);
			} else {
				var lastVal = obArray.x[obArray.x.length-1];
				if (lastVal < 96)
					obArray.x.push(lastVal+6);
			}
//			}
		})
	}
	
	var renderTable = function (data) {
		var template = "";
		
		for(var i =0; i< data.length ; i++) {
			var item = data[i];
			
		template +=	'<tr>'+
					'	<td>'+
					'   Day'+ (i+1) +
					'	</td>'+
					'	<td>'+
							item.temp.min +
					'	</td>'+
					'	<td>'+
							item.temp.max +
					'	</td>'+
					'</tr>';
		}
		
		$('#dtableBody').html(template);
	}
	
	this.getData = function() {
		var promise = getWeatherData();
		promise.then(function(response) {
			console.log(response);
			processData(response.list);
			renderTable(response.list);
		},function(error){
			console.log(error);
		})
	}
	
	
	return this;
	
})();

window.onload = function() {
	app.getData();
}
function loadWeather(){
	app.getData();
}
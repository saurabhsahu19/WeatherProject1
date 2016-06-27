package map;

import javax.ws.rs.client.*;
import javax.ws.rs.client.Invocation.Builder;
import javax.ws.rs.core.Response;


public class WeatherMap {
	
	/*public static void main(String[] args){
		getWeather();
	}*/
	
	public String getWeather(String location){		
		final String apiID = "fbfaa670d58ef1bd46a0d50351982274";
		// TODO Auto-generated method stub
		String sURL = "http://api.openweathermap.org/data/2.5/forecast/daily"; //just a string			
		Client client = ClientBuilder.newClient();
		WebTarget target = client.target(sURL).queryParam("q", location).queryParam("mode","json").queryParam("units","metric").
				queryParam("cnt","7").queryParam("appid", apiID);
		System.out.println(target);
		Builder builder = target.request();
	    Response response = builder.get();
	    String output = response.readEntity(String.class);
		//final target should be "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=fbfaa670d58ef1bd46a0d50351982274";
		System.out.println(output);
		return output;
	
	}
}

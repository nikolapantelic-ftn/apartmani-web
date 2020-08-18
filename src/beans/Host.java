package beans;

import java.util.ArrayList;
import java.util.List;

public class Host extends User implements Identifiable<String>{
	
	private List<Apartment> apartments;
	
	public Host() {
		super();
		this.role=Role.Host;
		this.apartments=new ArrayList<Apartment>();
	}

	public List<Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(List<Apartment> apartments) {
		this.apartments = apartments;
	}
	
}

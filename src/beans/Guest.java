package beans;

import java.util.ArrayList;
import java.util.List;

public class Guest extends User {

	private List<Apartment> rentedApartment;
	private List<Reservation> reservations;
	
	public Guest() {
		super();
		this.role=Role.Guest;
		this.rentedApartment=new ArrayList<Apartment>();
		this.reservations=new ArrayList<Reservation>();
	}
	
	public Guest(String username, String password, String firstName, String lastName, Role role, Gender gender) {
		super(username, password, firstName, lastName, role, gender);
		this.role=Role.Guest;
		this.rentedApartment=new ArrayList<Apartment>();
		this.reservations=new ArrayList<Reservation>();
		
	}

	public List<Apartment> getRentedApartment() {
		return rentedApartment;
	}

	public void setRentedApartment(List<Apartment> rentedApartment) {
		this.rentedApartment = rentedApartment;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}
	
	

}

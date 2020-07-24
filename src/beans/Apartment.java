package beans;

import java.awt.Image;
import java.util.Date;
import java.util.List;

public class Apartment {
	
	private ApartmentType type;
	private int numberOfRooms;
	private int numberOfGuests;
	private Location location;
	private List<Date> rentDates;
	private List<Date> avaliableDates;
	private Host host;
	private ApartmentComment comment;
	private List<Image> images;
	private double price;
	private String checkInTime; 
	private String checkOutTime;
	private ApartmentStatus status;
	private List<Amenities> amenities;
	private List<Reservation> reservations;
	
	public Apartment() {
		
	}
	
	

	public ApartmentType getType() {
		return type;
	}

	public void setType(ApartmentType type) {
		this.type = type;
	}

	public int getNumberOfRooms() {
		return numberOfRooms;
	}

	public void setNumberOfRooms(int numberOfRooms) {
		this.numberOfRooms = numberOfRooms;
	}

	public int getNumberOfGuests() {
		return numberOfGuests;
	}

	public void setNumberOfGuests(int numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public List<Date> getRentDates() {
		return rentDates;
	}

	public void setRentDates(List<Date> rentDates) {
		this.rentDates = rentDates;
	}

	public List<Date> getAvaliableDates() {
		return avaliableDates;
	}

	public void setAvaliableDates(List<Date> avaliableDates) {
		this.avaliableDates = avaliableDates;
	}

	public Host getHost() {
		return host;
	}

	public void setHost(Host host) {
		this.host = host;
	}

	public ApartmentComment getComment() {
		return comment;
	}

	public void setComment(ApartmentComment comment) {
		this.comment = comment;
	}

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(String checkInTime) {
		this.checkInTime = checkInTime;
	}

	public String getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(String checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	public ApartmentStatus getStatus() {
		return status;
	}

	public void setStatus(ApartmentStatus status) {
		this.status = status;
	}

	public List<Amenities> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<Amenities> amenities) {
		this.amenities = amenities;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}
		
	
	
	
}

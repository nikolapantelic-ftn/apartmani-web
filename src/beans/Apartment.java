package beans;

import java.awt.Image;
import java.util.Date;
import java.util.List;

public class Apartment implements Identifiable<Long>, Deletable {
	
	private long id;
	private String name;
	private ApartmentType type;
	private int numberOfRooms;
	private int numberOfGuests;
	private Location location;
	private List<Date> rentDates;
	private List<Date> avaliableDates;
	private Host host;
	private List<ApartmentComment> comments;
	private String mainImage;
	private List<String> images;
	private double price;
	private String checkInTime; 
	private String checkOutTime;
	private ApartmentStatus status;
	private List<Long> amenityIds;
	private List<Reservation> reservations;
	private boolean deleted;
	
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

	public List<ApartmentComment> getComments() {
		return comments;
	}

	public void setComments(List<ApartmentComment> comments) {
		this.comments = comments;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
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

	public List<Long> getAmenityIds() {
		return amenityIds;
	}

	public void setAmenityIds(List<Long> amenityIds) {
		this.amenityIds = amenityIds;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}
	
	public void setName(String name) {
		this.name=name;
	}
	public String getName() {
		return this.name;
	}
	
	@Override
	public Long getId() {
		return id;
	}
	
		
	@Override
	public void setId(Long id) {
		this.id = id;
	}



	public boolean isDeleted() {
		return deleted;
	}



	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}



	public String getMainImage() {
		return mainImage;
	}



	public void setMainImage(String mainImage) {
		this.mainImage = mainImage;
	}

}

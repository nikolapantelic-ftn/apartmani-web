package beans;

import java.util.Date;

public class Reservation implements Identifiable<Long>, Deletable {

	private long id;
	private long apartment;
	private Date startDate;
	private int nightsNumber=1;
	private double totalPrice;
	private String message;
	private long guest;
	private ReservationStatus status;
	private boolean deleted;
	
	public Reservation() {
		
	}

	public Reservation(long apartment, Date startDate, int nightsNumber, double totalPrice, String message,
			long guest, ReservationStatus status) {
		super();
		this.apartment = apartment;
		this.startDate = startDate;
		this.nightsNumber = nightsNumber;
		this.totalPrice = totalPrice;
		this.message = message;
		this.guest = guest;
		this.status = status;
	}

	public long getApartment() {
		return apartment;
	}

	public void setApartment(long apartment) {
		this.apartment = apartment;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getNightsNumber() {
		return nightsNumber;
	}

	public void setNightsNumber(int nightsNumber) {
		this.nightsNumber = nightsNumber;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public long getGuest() {
		return guest;
	}

	public void setGuest(long guest) {
		this.guest = guest;
	}

	public ReservationStatus getStatus() {
		return status;
	}

	public void setStatus(ReservationStatus status) {
		this.status = status;
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
	
}

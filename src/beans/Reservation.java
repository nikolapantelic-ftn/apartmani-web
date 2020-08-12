package beans;

import java.util.Date;

public class Reservation implements Identifiable<Long> {

	private long id;
	private Apartment apartment;
	private Date startDate;
	private int nigtsNumber=1;
	private double totalPrice;
	private String message;
	private Guest guest;
	private ReservationStatus status;
	
	public Reservation() {
		
	}

	public Reservation(Apartment apartment, Date startDate, int nigtsNumber, double totalPrice, String message,
			Guest guest, ReservationStatus status) {
		super();
		this.apartment = apartment;
		this.startDate = startDate;
		this.nigtsNumber = nigtsNumber;
		this.totalPrice = totalPrice;
		this.message = message;
		this.guest = guest;
		this.status = status;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getNigtsNumber() {
		return nigtsNumber;
	}

	public void setNigtsNumber(int nigtsNumber) {
		this.nigtsNumber = nigtsNumber;
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

	public Guest getGuest() {
		return guest;
	}

	public void setGuest(Guest guest) {
		this.guest = guest;
	}

	public ReservationStatus getStatus() {
		return status;
	}

	public void setStatus(ReservationStatus status) {
		this.status = status;
	}
	
	@Override
	public Long id() {
		return id;
	}
	
	@Override
	public void updateId(Long id) {
		this.id = id;
	}
	
}

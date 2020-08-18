package beans;

public class Address implements Identifiable<Long>, Deletable {
	
	private long id;
	private String streetAndNumber;
	private String place;
	private String zipCode;
	private boolean deleted;
	
	public Address() {
		
	}
	
	
	
	public Address(String streetAndNumber, String place, String zipCode) {
		super();
		this.streetAndNumber = streetAndNumber;
		this.place = place;
		this.zipCode = zipCode;
	}



	public String getStreetAndNumber() {
		return streetAndNumber;
	}
	public void setStreetAndNumber(String streetAndNumber) {
		this.streetAndNumber = streetAndNumber;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
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

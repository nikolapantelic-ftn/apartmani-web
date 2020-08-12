package beans;

public class Location implements Identifiable<Long> {
	
	private long id;
	private String longitude;
	private String latitude;
	private Address address;
	
	public Location() {
		
	}
	
	public Location(String longitude, String latitude, Address address) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}

	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
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

package beans;

public class Amenities {
	
	private long id;
	private String naziv;
	
	public Amenities() {
		
	}
	
	public Amenities(long id, String naziv) {
		super();
		this.id = id;
		this.naziv = naziv;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	
	
	
	

}

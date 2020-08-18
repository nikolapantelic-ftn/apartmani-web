package beans;

public class Amenity implements Identifiable<Long>, Deletable {
	
	private long id;
	private String naziv;
	private boolean deleted;
	
	public Amenity() {
		
	}
	
	public Amenity(long id, String naziv) {
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

	@Override
	public Long id() {
		return id;
	}

	@Override
	public void updateId(Long id) {
		this.id = id;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
	
	
	

}

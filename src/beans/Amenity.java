package beans;

public class Amenity implements Identifiable<Long>, Deletable {
	
	private long id;
	private String naziv;
	private boolean deleted;
	
	public Amenity() {
		
	}
	

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
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

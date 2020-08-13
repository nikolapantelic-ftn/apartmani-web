package beans;

public class ApartmentComment implements Identifiable<Long> {

	private long id;
	private Guest guest;
	private Apartment apartment;
	private String text;
	private int mark;
	
	public ApartmentComment() {
		
	}

	public ApartmentComment(Guest guest, Apartment apartment, String text, int mark) {
		super();
		this.guest = guest;
		this.apartment = apartment;
		this.text = text;
		this.mark = mark;
	}

	public Guest getGuest() {
		return guest;
	}

	public void setGuest(Guest guest) {
		this.guest = guest;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getMark() {
		return mark;
	}

	public void setMark(int mark) {
		this.mark = mark;
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

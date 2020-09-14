package beans;

public class ApartmentComment implements Identifiable<Long>, Deletable {

	private long id;
	private Guest guest;
	private long apartmentId;
	private String text;
	private int mark;
	private boolean deleted;
	private boolean toDisplay;
	
	public ApartmentComment() {
		
	}

	public ApartmentComment(Guest guest, long apartmentId, String text, int mark) {
		super();
		this.guest = guest;
		this.apartmentId = apartmentId;
		this.text = text;
		this.mark = mark;
	}

	public Guest getGuest() {
		return guest;
	}

	public void setGuest(Guest guest) {
		this.guest = guest;
	}

	public long getApartmentId() {
		return apartmentId;
	}

	public void setApartmentId(long apartmentId) {
		this.apartmentId = apartmentId;
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

	public boolean isToDisplay() {
		return toDisplay;
	}

	public void setToDisplay(boolean toDisplay) {
		this.toDisplay = toDisplay;
	}

}

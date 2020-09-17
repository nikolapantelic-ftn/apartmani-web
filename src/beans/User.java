package beans;


public class User implements Identifiable<String>, Deletable,IBlocked {
	
	protected String username;
	protected String password;
	protected String firstName;
	protected String lastName;
	protected Role role;
	protected Gender gender;
	protected boolean blocked;
	protected boolean deleted;
	
	public User() {
		
	}
	
	public User(String username, String password, String firstName, String lastName, Role role, Gender gender) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		this.gender = gender;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}

	@Override
	public String getId() {
		return getUsername();
	}

	@Override
	public void setId(String id) {
		setUsername(id);
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public boolean isBlocked() {
		return blocked;
	}

	@Override
	public void setBlocked(boolean blocked) {
		this.blocked=blocked;
		
	}
	
}

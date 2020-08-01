package beans;

public class Admin extends User {

	public Admin() {
		super();
		role=Role.Admin;
	}
	public Admin(String username, String password, String firstName, String lastName,  Gender gender) {
		super(username, password, firstName, lastName, Role.Admin, gender);
	}
}

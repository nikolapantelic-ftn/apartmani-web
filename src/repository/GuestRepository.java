package repository;

import beans.Guest;

public class GuestRepository extends AbstractRepository<Guest, String> {

	public GuestRepository(String path) {
		super(path);
	}

}

package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;


import beans.Reservation;

public class ReservationRepository extends AbstractRepository<Reservation, Long> {

	public ReservationRepository(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Reservation>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}

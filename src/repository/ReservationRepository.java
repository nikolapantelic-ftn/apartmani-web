package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;


import beans.Reservation;
import repository.sequencer.LongSequencer;

public class ReservationRepository extends AbstractLongRepository<Reservation> {

	public ReservationRepository(String path) {
		super(path, new LongSequencer());
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

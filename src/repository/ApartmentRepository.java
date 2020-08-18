package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Apartment;
import repository.sequencer.LongSequencer;


public class ApartmentRepository extends AbstractLongRepository<Apartment> {

	public ApartmentRepository(String path) {
		super(path, new LongSequencer());
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Apartment>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}

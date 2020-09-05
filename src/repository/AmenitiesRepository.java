package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Amenity;
import repository.sequencer.LongSequencer;


public class AmenitiesRepository extends AbstractLongRepository<Amenity> {


	public AmenitiesRepository(String path) {
		super(path, new LongSequencer());
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Amenity>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}

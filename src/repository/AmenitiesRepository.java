package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Amenities;

public class AmenitiesRepository extends AbstractRepository<Amenities, Long>{

	public AmenitiesRepository(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Amenities>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}

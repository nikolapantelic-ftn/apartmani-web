package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Amenity;

public class AmenitiesRepository extends AbstractRepository<Amenity, Long>{

	public AmenitiesRepository(String path) {
		super(path);
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

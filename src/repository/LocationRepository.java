package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Location;

public class LocationRepository extends AbstractRepository<Location, Long>{

	public LocationRepository(String path) {
		super(path);

	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Location>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	

}

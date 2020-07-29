package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Apartment;


public class ApartmentRepository extends AbstractRepository<Apartment, Long> {

	public ApartmentRepository(String path) {
		super(path);
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

package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Admin;

public class AdminRepository extends AbstractRepository<Admin, String> {

	public AdminRepository(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Admin>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}

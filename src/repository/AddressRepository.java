package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Address;

public class AddressRepository extends AbstractRepository<Address,Long>{

	public AddressRepository(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Address>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
}

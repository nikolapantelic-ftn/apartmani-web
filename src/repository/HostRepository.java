package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;
import beans.Host;

public class HostRepository extends AbstractRepository<Host, String> {

	public HostRepository(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Host>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}

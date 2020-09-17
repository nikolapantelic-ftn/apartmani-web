package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;
import beans.Host;

public class HostRepository extends AbstractRepository<Host, String> implements IBlockedRepository<Host> {

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

	@Override
	public Host block(String username) throws JsonIOException, IOException {
		Host h=get(username);
		h.setBlocked(true);
		save(h);
		return h;
	}

	@Override
	public Host unblock(String username) throws JsonIOException, IOException {
		Host h=get(username);
		h.setBlocked(false);
		save(h);
		return h;
	}

}

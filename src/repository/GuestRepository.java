package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.Guest;

public class GuestRepository extends AbstractRepository<Guest, String> implements IBlockedRepository<Guest> {

	public GuestRepository(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Guest>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public Guest block(String username) throws JsonIOException, IOException {
		Guest g=get(username);
		g.setBlocked(true);
		save(g);
		return g;
	}

	@Override
	public Guest unblock(String username) throws JsonIOException, IOException {
		Guest g=get(username);
		g.setBlocked(false);
		save(g);
		return g;
	}

}

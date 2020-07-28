package repository;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

import com.google.gson.JsonIOException;

interface Repository<T, ID> {
	
	public void save(T entity) throws JsonIOException, IOException;

	public void loadEntities(Type type) throws IOException;

	public void saveAll() throws JsonIOException, IOException;

	public Map<ID, T> getAll();

	public void delete(ID id) throws JsonIOException, IOException;
	
	public void init();
}

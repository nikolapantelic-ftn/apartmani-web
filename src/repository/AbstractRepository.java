package repository;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;

import beans.Identifiable;

abstract class AbstractRepository<T extends Identifiable<ID>, ID> implements Repository<T, ID> {
	private Map<ID, T> entities;
	private Gson gson;
	private String filepath;
	
	public AbstractRepository(String path) {
		entities = new HashMap<ID, T>();
		gson = new Gson();
		filepath = path;
		init();
	}

	@Override
	public T save(T entity) throws JsonIOException, IOException {
		entities.put(entity.id(), entity);
		saveAll();
		return entity;
	}

	@Override
	public void loadEntities(Type type) throws IOException {
		Reader reader = Files.newBufferedReader(Paths.get(filepath));
		List<T> entitiesList = gson.fromJson(reader, type);
		for (T entity : entitiesList) {
			entities.put(entity.id(), entity);
		}
	}

	@Override
	public void saveAll() throws JsonIOException, IOException {
		FileWriter file = new FileWriter(filepath);
		file.write(gson.toJson(entities.values()));
		file.close();
	}

	@Override
	public Map<ID, T> getAll() {
		return entities;
	}

	@Override
	public void delete(ID id) throws JsonIOException, IOException {
		entities.remove(id);
		saveAll();
	}

}

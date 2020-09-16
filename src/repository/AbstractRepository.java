package repository;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;

import beans.Deletable;
import beans.Identifiable;

abstract class AbstractRepository<T extends Identifiable<ID> & Deletable, ID> implements Repository<T, ID> {
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
		entities.put(entity.getId(), entity);
		saveAll();
		return entity;
	}

	@Override
	public void loadEntities(Type type) throws IOException {
		File tmp=new File(filepath);
		if(!tmp.exists()) {
			FileWriter file = new FileWriter(filepath);
			file.close();
		}
		Reader reader = Files.newBufferedReader(Paths.get(filepath));
		List<T> entitiesList = gson.fromJson(reader, type);
		if(entitiesList != null) {
			for (T entity : entitiesList) {
				entities.put(entity.getId(), entity);
			}
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
	public T delete(ID id) throws JsonIOException, IOException {
		entities.get(id).setDeleted(true);
		saveAll();
		return entities.get(id);
	}
	
	@Override
	public Collection<T> getActive(){
		Collection<T> ret=new ArrayList<T>();
		for (T t : entities.values()) {
			if(!t.isDeleted())
				ret.add(t);
		}
		return ret;
	}
	
	@Override
	public T get(ID id) {
		T entity = entities.get(id);
		if (entity == null) return null;
		if (entity.isDeleted()) return null;
		return entity;
	}

}

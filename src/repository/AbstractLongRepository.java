package repository;

import java.io.IOException;
import java.util.Collection;

import com.google.gson.JsonIOException;

import beans.Deletable;
import beans.Identifiable;
import repository.sequencer.LongSequencer;

abstract class AbstractLongRepository<T extends Identifiable<Long> & Deletable> extends AbstractRepository<T, Long> {

	private LongSequencer sequencer;
	
	public AbstractLongRepository(String path, LongSequencer sequencer) {
		super(path);
		this.sequencer = sequencer;
		initId();
	}
	
	@Override
	public T save(T newEntity) throws JsonIOException, IOException {
		T entity = getAll().get(newEntity.id());
		if (entity == null) {
			newEntity.updateId(sequencer.generateId());
		}
		getAll().put(newEntity.id(), newEntity);
		saveAll();
		return newEntity;
	}
	
	private void initId() {
		sequencer.initialize(getMaxId(getAll().values()));
	}

	private long getMaxId(Collection<T> entities) {
		long maxId = 0;
		for (T entity : entities) {
			if (entity.id() > maxId) {
				maxId = entity.id();
			}
		}
		return maxId;
	}

}

package repository.sequencer;

public class LongSequencer implements Sequencer<Long> {

	private long nextId;
	
	@Override
	public void initialize(Long id) {
		nextId = id;
	}

	@Override
	public Long generateId() {
		return ++nextId;
	}

}

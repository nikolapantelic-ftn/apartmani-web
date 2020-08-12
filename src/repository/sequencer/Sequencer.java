package repository.sequencer;

public interface Sequencer<ID> {
	
	void initialize(ID id);
	
	ID generateId();
}

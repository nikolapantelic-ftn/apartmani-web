package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.ApartmentComment;
import repository.sequencer.LongSequencer;


public class ApartmentCommentRepository extends AbstractLongRepository< ApartmentComment> {

	public ApartmentCommentRepository(String path) {
		super(path, new LongSequencer());

	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<ApartmentComment>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
}

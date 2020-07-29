package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.ApartmentComment;


public class ApartmentCommentRepository extends AbstractRepository< ApartmentComment, Long> {

	public ApartmentCommentRepository(String path) {
		super(path);

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

package util;

import java.io.File;

public class ImageSequencer {
	
	private long id;
	private String dir;
	
	public ImageSequencer(String dir) {
		this.dir = dir;
		init();
	}
	private void init() {
		id = 0;
		long currId;
		String [] pathNames;
		File f = new File(dir);
		if (f != null) {
			pathNames = f.list();
			for(String pathName : pathNames) {
				currId = Long.parseLong(pathName.split("\\.")[0]);
				if(id < currId) {
					id = currId;
				}
			}
		}
	}
	public long generateId() {
		return ++id;
	}
}

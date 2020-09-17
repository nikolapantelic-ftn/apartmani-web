package repository;

import java.io.IOException;

import com.google.gson.JsonIOException;

public interface IBlockedRepository<T> {
	
	public T block(String username) throws JsonIOException, IOException;
	
	public T unblock(String username) throws JsonIOException, IOException;
}

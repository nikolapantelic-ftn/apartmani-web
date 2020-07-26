package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.User;

public class UserDAO {
	private Map<String,User> users;
	private Gson gson;
	private String filepath;
	
	public UserDAO(String path) {
		users=new HashMap<String, User>();
		gson=new Gson();
		filepath=path;
	}
	
	public void save(User user) throws JsonIOException, IOException {
		users.put(user.getUsername(),user);
		saveAll();
	}
	
	public void loadUsers() throws IOException {
		Reader reader = Files.newBufferedReader(Paths.get(filepath));
		List<User> usersList = new Gson().fromJson(reader, new TypeToken<List<User>>() {}.getType());
		for (User user : usersList) {
			users.put(user.getUsername(), user);
		}
	}
	
	public void saveAll() throws JsonIOException, IOException {
		FileWriter file = new FileWriter(filepath);
		file.write(gson.toJson(users.values()));
		file.close();
	}

	public Map<String, User> getUsers() {
		return users;
	}

	public void delete(String username) throws JsonIOException, IOException {
		users.remove(username);
		saveAll();
	}
	
}

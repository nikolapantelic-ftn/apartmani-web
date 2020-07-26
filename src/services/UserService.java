package services;

import java.io.IOException;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.google.gson.JsonIOException;

import app.WebApp;
import beans.User;
import dao.UserDAO;

@Path("/userService")
public class UserService {
	@Context
	ServletContext ctx;
	
	public UserService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("userDAO") == null) {
			ctx.setAttribute("userDAO", new UserDAO(WebApp.USERS_PATH));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAll() {
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");
		return userDAO.getUsers().values();
	}
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User create(User user) {
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");
		try {
			userDAO.save(user);
			return user;
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User find(@PathParam("id") String username) {
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");
		return userDAO.getUsers().get(username);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") String username) {
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");
		try {
			userDAO.delete(username);
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

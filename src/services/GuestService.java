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
import beans.Guest;
import repository.GuestRepository;

@Path("/guests")
public class GuestService {
	@Context
	ServletContext ctx;
	
	public GuestService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("guestRepository") == null) {
			ctx.setAttribute("guestRepository", new GuestRepository(WebApp.GUESTS_PATH));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Guest> getAll() {
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		return guestRepository.getAll().values();
	}
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Guest create(Guest guest) {
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		try {
			guestRepository.save(guest);
			return guest;
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GET
	@Path("/search/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Guest find(@PathParam("id") String username) {
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		return guestRepository.getAll().get(username);
	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	public Guest login(Guest guest) {
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		Guest g = guestRepository.getAll().get(guest.getUsername());
		if (g.getPassword().equals(guest.getPassword())) {
			return g;
		} else return null;
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") String username) {
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		try {
			guestRepository.delete(username);
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

package services;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.google.gson.JsonIOException;

import app.WebApp;
import beans.Guest;
import beans.User;
import repository.AdminRepository;
import repository.GuestRepository;
import repository.HostRepository;

@Path("/register")
public class RegistrationService {

	@Context
	ServletContext ctx;
	
	public RegistrationService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("guestRepository") == null) {
			ctx.setAttribute("guestRepository", new GuestRepository(WebApp.GUESTS_PATH));
		}
		if(ctx.getAttribute("hostRepository") == null) {
			ctx.setAttribute("hostRepository", new HostRepository(WebApp.HOSTS_PATH));
		}
		if(ctx.getAttribute("adminRepository") == null) {
			ctx.setAttribute("adminRepository", new AdminRepository(WebApp.ADMIN_PATH));
		}
	}
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Guest register(Guest guest) {
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		HostRepository hostRepository = (HostRepository)ctx.getAttribute("hostRepository");
		AdminRepository adminRepository = (AdminRepository)ctx.getAttribute("adminRepository");
		User user = guestRepository.getAll().get(guest.getUsername());
		if (user != null) {
			return null;
		}
		user = hostRepository.getAll().get(guest.getUsername());
		if (user != null) {
			return null;
		}
		user = adminRepository.getAll().get(guest.getUsername());
		if (user != null) {
			return null;
		}
		
		try {
			return guestRepository.save(guest);
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
}

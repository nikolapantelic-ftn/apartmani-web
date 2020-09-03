package services;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import app.WebApp;
import beans.User;
import repository.AdminRepository;
import repository.GuestRepository;
import repository.HostRepository;

@Path("/users")
public class UserService {

	@Context
	ServletContext ctx;
	
	public UserService() {

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
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getAll() {
		List<User> ret=new ArrayList<User>();
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		AdminRepository adminRepository=(AdminRepository) ctx.getAttribute("adminRepository");
		HostRepository hostRepository=(HostRepository) ctx.getAttribute("hostRepository");
		ret.addAll(guestRepository.getAll().values());
		ret.addAll(adminRepository.getAll().values());
		ret.addAll(hostRepository.getAll().values());
		return ret;
	}
}

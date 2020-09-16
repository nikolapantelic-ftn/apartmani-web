package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.JsonIOException;

import app.WebApp;
import beans.Guest;
import beans.Host;
import beans.Role;
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
		ret.addAll(guestRepository.getActive());
		ret.addAll(adminRepository.getActive());
		ret.addAll(hostRepository.getActive());
		return ret;
	}
	@POST
	@Path("/isAdmin")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response isAdmin( @Context HttpServletRequest request) {
		User u=(User) request.getSession().getAttribute("user");
		if(u==null) {
			return Response.status(403).entity("Zabranjeno").build();
		}
		if(u.getRole()!=Role.Admin) {
			return Response.status(403).entity("Zabranjeno").build();
		}
		return Response.status(200).build();
	}
	
	@POST
	@Path("/isGuest")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response isGuest(@Context HttpServletRequest request) {
		User u = (User)request.getSession().getAttribute("user");
		if (u == null) {
			return Response.status(403).entity("Zabranjeno").build();
		}
		if(u.getRole() != Role.Guest) {
			return Response.status(403).entity("Zabranjeno").build();
		}
		return Response.status(200).build();
	}
	
	@POST
	@Path("/guest-profile")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editGuestProfile(Guest guest, @Context HttpServletRequest request) {
		User currentUser = (User)request.getSession().getAttribute("user");
		if (currentUser == null) {
			return Response.status(403).entity("Zabranjeno").build();
		}
		if (!currentUser.getUsername().equals(guest.getUsername())) {
			return Response.status(403).entity("Zabranjeno").build();
		}
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		try {
			guestRepository.save(guest);
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return Response.status(200).build();
	}
	@POST
	@Path("/host-profile")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editHostProfile(Host host, @Context HttpServletRequest request) {
		User currentUser = (User)request.getSession().getAttribute("user");
		if (currentUser == null) {
			return Response.status(403).entity("Zabranjeno").build();
		}
		if (!currentUser.getUsername().equals(host.getUsername())) {
			return Response.status(403).entity("Zabranjeno").build();
		}
		HostRepository hostRepository = (HostRepository)ctx.getAttribute("hostRepository");
		try {
			hostRepository.save(host);
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return Response.status(200).build();
	}
}

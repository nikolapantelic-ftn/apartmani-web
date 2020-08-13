package services;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;



import app.WebApp;
import beans.User;
import repository.AdminRepository;
import repository.GuestRepository;
import repository.HostRepository;

@Path("")
public class LoginService {

	@Context
	ServletContext ctx;
	
	public LoginService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("guestRepository") == null) {
			ctx.setAttribute("guestRepository", new GuestRepository(WebApp.GUESTS_PATH));
		}
		if(ctx.getAttribute("hostRepository")==null) {
			ctx.setAttribute("hostRepository", new HostRepository(WebApp.HOSTS_PATH));
		}
		if(ctx.getAttribute("adminRepository")==null) {
			ctx.setAttribute("adminRepository", new AdminRepository(WebApp.ADMIN_PATH));
		}
	}
	
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		User loggedUser = guestRepository.getAll().get(user.getUsername());
		if (loggedUser == null) {
			HostRepository hostRepository=(HostRepository)ctx.getAttribute("hostRepository");
			loggedUser=hostRepository.getAll().get(user.getUsername());
			if(loggedUser==null) {
				AdminRepository adminRepository=(AdminRepository)ctx.getAttribute("adminRepository");
				loggedUser=adminRepository.getAll().get(user.getUsername());
				if(loggedUser==null) {
					return Response.status(400).entity("Invalid username and/or password").build();
				}
			}
		}
		if(!user.getPassword().equals(loggedUser.getPassword())){
			return Response.status(400).entity("Invalid username and/or password").build();
		}
			
		
		request.getSession().setAttribute("user", loggedUser);
		return Response.status(200).build();
	}
	
	
	@GET
	@Path("/logout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}
	
	@GET
	@Path("/currentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User currentUser(@Context HttpServletRequest request) {
		return (User) request.getSession().getAttribute("user");
	}
}



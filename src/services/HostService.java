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
import beans.Host;
import repository.HostRepository;

@Path("/hosts")
public class HostService {
	@Context
	ServletContext ctx;
	
	public HostService() {
		
	}
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("hostRepository")==null) {
			ctx.setAttribute("hostRepository", new HostRepository(WebApp.HOSTS_PATH));
		}
		
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Host> getAll() {
		HostRepository hostRepository = (HostRepository)ctx.getAttribute("hostRepository");
		return hostRepository.getAll().values();
	}
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Host create(Host host) {
		HostRepository hostRepository = (HostRepository)ctx.getAttribute("hostRepository");
		try {
			hostRepository.save(host);
			return host;
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
	public Host find(@PathParam("id") String username) {
		HostRepository hostRepository = (HostRepository)ctx.getAttribute("hostRepository");
		return hostRepository.getAll().get(username);
	}
	
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") String username) {
		HostRepository hostRepository = (HostRepository)ctx.getAttribute("hostRepository");
		try {
			hostRepository.delete(username);
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

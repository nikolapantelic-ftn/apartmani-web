package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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
import beans.Apartment;
import beans.Location;
import repository.ApartmentRepository;



@Path("/apartments")
public class ApartmentService {
	@Context
	ServletContext ctx;

	public ApartmentService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("apartmentRepository") == null) {
			ctx.setAttribute("apartmentRepository", new ApartmentRepository(WebApp.APARTMENTS_PATH));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Apartment> getAll() {
		ApartmentRepository apartmentRepository = (ApartmentRepository)ctx.getAttribute("apartmentRepository");
		return apartmentRepository.getAll().values();
	}
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment create(Apartment apartment) {
		ApartmentRepository apartmentRepository = (ApartmentRepository)ctx.getAttribute("apartmentRepository");
		try {
			return apartmentRepository.save(apartment);
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
	public Apartment find(@PathParam("id") long id) {
		ApartmentRepository apartmentRepository = (ApartmentRepository)ctx.getAttribute("apartmentRepository");
		return apartmentRepository.getAll().get(id);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") long id) {
		ApartmentRepository apartmentRepository = (ApartmentRepository)ctx.getAttribute("apartmentRepository");
		try {
			apartmentRepository.delete(id);
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@GET
	@Path("/searchF/{location}/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> findByParams(@PathParam("location") String location,@PathParam("name") String name) {
		ApartmentRepository apartmentRepository = (ApartmentRepository)ctx.getAttribute("apartmentRepository");
		List<Apartment> ret=new ArrayList<Apartment>();
		for (Apartment a : apartmentRepository.getAll().values()) {
			if(a.getName().equals(location))
			ret.add(a);
		}
		return ret;
	}
	
	public boolean equalLocation(String string,Location location) {
		if(string.equals(" "))
			return true;
		if(string.equals(location.getAddress().getPlace()))
			return true;
		return false;
	}
	
	
	
	
}

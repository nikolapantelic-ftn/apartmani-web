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
import beans.Amenity;

import repository.AmenitiesRepository;


@Path("/amenities")
public class AmenityService {

	@Context
	ServletContext ctx;
	public AmenityService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("amenitiesRepository") == null) {
			ctx.setAttribute("amenitiesRepository", new AmenitiesRepository(WebApp.AMENITY_PATH));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Amenity> getAll() {
		AmenitiesRepository amenitiesRepository = (AmenitiesRepository)ctx.getAttribute("amenitiesRepository");
		return amenitiesRepository.getAll().values();
	}
	
	
	@GET
	@Path("/active")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Amenity> getActive() {
		AmenitiesRepository amenitiesRepository = (AmenitiesRepository)ctx.getAttribute("amenitiesRepository");
		return amenitiesRepository.getActive();
	}
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity create(Amenity a) {
		AmenitiesRepository amenitiesRepository = (AmenitiesRepository)ctx.getAttribute("amenitiesRepository");
		try {
			amenitiesRepository.save(a);
			return a;
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@DELETE
	@Path("/{id}")
	public Amenity delete(@PathParam("id") long id) {
		AmenitiesRepository amenitiesRepository = (AmenitiesRepository)ctx.getAttribute("amenitiesRepository");
		try {
			Amenity tmp=amenitiesRepository.getAll().get(id);
			amenitiesRepository.delete(id);
			return tmp;
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}

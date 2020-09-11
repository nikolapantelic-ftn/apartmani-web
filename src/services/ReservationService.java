package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.JsonIOException;

import app.WebApp;
import beans.Reservation;
import repository.ReservationRepository;

@Path("/reservations")
public class ReservationService {
	@Context
	ServletContext ctx;
	
	public ReservationService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("reservationRepository") == null) {
			ctx.setAttribute("reservationRepository", new ReservationRepository(WebApp.RESERVATIONS_PATH));
		}
	}
	
	@Path("/")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservation> getAll() {
		ReservationRepository repository = (ReservationRepository)ctx.getAttribute("reservationRepository");
		return repository.getAll().values();
	}
	
	@Path("/apartment/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservation> getApartmentReservations(@PathParam("id") long id) {
		ArrayList<Reservation> apartmentReservations = new ArrayList<Reservation>();
		for(Reservation r : getAll()) {
			if (r.getApartment() == id) {
				apartmentReservations.add(r);
			}
		}
		return apartmentReservations;
	}
	
	@Path("/")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createReservation(Reservation reservation) {
		//TODO Validacija mogucnosti rezervacije
		ReservationRepository repository = (ReservationRepository)ctx.getAttribute("reservationRepository");
		try {
			repository.save(reservation);
			return Response.status(200).entity(reservation).build();
		} catch (JsonIOException | IOException e) {
			e.printStackTrace();
		}
		return Response.status(400).entity("Neispravna rezervacija.").build();
	}
}

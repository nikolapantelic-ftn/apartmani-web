package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import beans.Guest;
import beans.Reservation;
import repository.ApartmentRepository;
import repository.GuestRepository;
import repository.ReservationRepository;

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
		if(ctx.getAttribute("apartmentRepository") == null) {
			ctx.setAttribute("apartmentRepository", new ApartmentRepository(WebApp.APARTMENTS_PATH));
		}
		if(ctx.getAttribute("reservationRepository") == null) {
			ctx.setAttribute("reservationRepository", new ReservationRepository(WebApp.RESERVATIONS_PATH));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Guest> getAll() {
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		return guestRepository.getActive();
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
		return guestRepository.get(username);
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
	
	@GET
	@Path("/host/{hostId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Guest> getHostGuests(@PathParam("hostId") String hostId) {
		GuestRepository guestRepository = (GuestRepository)ctx.getAttribute("guestRepository");
		List<Apartment> hostApartments = getHostApartments(hostId);
		ReservationRepository reservationRepository = (ReservationRepository)ctx.getAttribute("reservationRepository");
		ArrayList<Reservation> hostReservations = new ArrayList<Reservation>();
		Boolean contains;
		for (Reservation r: reservationRepository.getActive()) {
			contains = false;
			for (Apartment a: hostApartments) {
				if (r.getApartment() == a.getId()) {
					contains = true;
				}
			}
			if (contains) {
				hostReservations.add(r);
			}
		}
		Map<String, Guest> guests = new HashMap<String, Guest>();
		for (Reservation r: hostReservations) {
			guests.put(r.getGuest(), guestRepository.get(r.getGuest()));
		}
		
		return guests.values();
		
	}
	
	private List<Apartment> getHostApartments(String id) {
		ApartmentRepository apartmentRepository = (ApartmentRepository)ctx.getAttribute("apartmentRepository");
		List<Apartment> apartments = new ArrayList<Apartment>();
		for (Apartment a : apartmentRepository.getActive()) {
			if (a.getHost() != null) {
				if (a.getHost().equals(id)) {
					apartments.add(a);
				}
			}
		}
		return apartments;
	}
}

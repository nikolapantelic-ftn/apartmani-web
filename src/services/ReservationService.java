package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
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
import javax.ws.rs.core.Response;

import com.google.gson.JsonIOException;

import app.WebApp;
import beans.Apartment;
import beans.Reservation;
import repository.ApartmentRepository;
import repository.ReservationRepository;
import util.DateUtil;

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
		if (ctx.getAttribute("apartmentRepository") == null) {
			ctx.setAttribute("apartmentRepository", new ApartmentRepository(WebApp.APARTMENTS_PATH));
		}
	}

	@Path("/")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservation> getAll() {
		ReservationRepository repository = (ReservationRepository) ctx.getAttribute("reservationRepository");
		return repository.getAll().values();
	}

	@Path("/apartment/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservation> getApartmentReservations(@PathParam("id") long id) {
		ArrayList<Reservation> apartmentReservations = new ArrayList<Reservation>();
		for (Reservation r : getAll()) {
			if (r.getApartment() == id && !r.isDeleted()) {
				apartmentReservations.add(r);
			}
		}
		return apartmentReservations;
	}
	
	@Path("/apartment/{id}/rent-dates")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Date> getApartmentRentedDates(@PathParam("id") long id) {
		List<Date> rentDates = new ArrayList<Date>();
		for (Reservation r : getApartmentReservations(id)) {
			for (Date rd : calculateRentDates(r.getStartDate(), r.getNightsNumber())) {
				rentDates.add(rd);
			}
		}
		return rentDates;
	}

	@Path("/")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createReservation(Reservation reservation) {
		if (!isReservationAvailable(reservation)) {
			return Response.status(400).entity("Rezervacija za izabrane dane nije moguca.").build();
		}
		ReservationRepository repository = (ReservationRepository) ctx.getAttribute("reservationRepository");
		try {
			repository.save(reservation);
			return Response.status(200).entity(reservation).build();
		} catch (JsonIOException | IOException e) {
			e.printStackTrace();
		}
		return Response.status(400).entity("Neispravna rezervacija.").build();
	}
	
	@Path("/available")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Boolean isReservationAvailable(Reservation reservation) {
		List<Date> rentDates = calculateRentDates(reservation.getStartDate(), reservation.getNightsNumber());
		ApartmentRepository repository = (ApartmentRepository) ctx.getAttribute("apartmentRepository");
		Apartment apartment = repository.getAll().get(reservation.getApartment());

		if (!rentDatesAvailable(rentDates, apartment.getAvailableDates())) {
			return false;
		}
		if (!rentDatesFree(rentDates, (List<Date>)getApartmentRentedDates(reservation.getApartment()))) {
			return false;
		}
		return true;
	}
	
	@Path("/guest/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservation> getGuestReservations(@PathParam("id") String guestId) {
		List<Reservation> guestReservations = new ArrayList<Reservation>();
		for (Reservation r : getAll()) {
			if (r.getGuest().equals(guestId)) {
				guestReservations.add(r);
			}
		}
		return guestReservations;
	}
	
	@Path("/{id}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public Response cancelReservation(@PathParam("id") long id) {
		ReservationRepository repository = (ReservationRepository) ctx.getAttribute("reservationRepository");
		try {
			repository.delete(id);
		} catch (JsonIOException | IOException e) {
			e.printStackTrace();
		}
		return Response.status(200).build();
	}
	
	@Path("apartment/{id}/free-dates")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Date> getApartmentFreeDates(@PathParam("id") long id) {
		ApartmentRepository repository = (ApartmentRepository) ctx.getAttribute("apartmentRepository");
		Apartment apartment = repository.getAll().get(id);
		List<Date> freeDates = new ArrayList<Date>();
		for (Date date : apartment.getAvailableDates()) {
			Boolean dateAvailable = true;
			for (Date rentedDate : getApartmentRentedDates(id)) {
				if(DateUtil.isSameDay(date, rentedDate)) {
					dateAvailable = false;
				}
			}
			if (dateAvailable) {
				freeDates.add(date);
			}
		}
		return freeDates;
	}

	private List<Date> calculateRentDates(Date startDate, int nightsNumber) {
		ArrayList<Date> rentDates = new ArrayList<Date>();
		if (startDate == null) return rentDates;
		for (int i = 0; i < nightsNumber; i++) {
			rentDates.add(DateUtil.addDays(startDate, i));
		}
		return rentDates;
	}

	private Boolean rentDatesAvailable(List<Date> rentDates, List<Date> availableDates) {
		if (availableDates == null || rentDates == null) return false;
		if (rentDates.isEmpty() || availableDates.isEmpty()) return false;
		for (Date rentDate : rentDates) {
			Boolean dateAvailable = false;
			for (Date availableDate : availableDates) {
				if (DateUtil.isSameDay(rentDate, availableDate)) {
					dateAvailable = true;
				}
			}
			if (!dateAvailable)
				return false;
		}
		return true;
	}

	private Boolean rentDatesFree(List<Date> rentDates, List<Date> takenDates) {
		if (takenDates == null) return true;
		for (Date rentDate : rentDates) {
			for (Date takenDate : takenDates) {
				if (DateUtil.isSameDay(rentDate, takenDate))
					return false;
			}
		}
		return true;
	}
}

package services;

import java.io.IOException;
import java.util.ArrayList;
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
import beans.ApartmentComment;
import repository.ApartmentCommentRepository;

@Path("/comments")
public class CommentService {
	@Context
	ServletContext ctx;

	public CommentService() {

	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("commentRepository") == null) {
			ctx.setAttribute("commentRepository", new ApartmentCommentRepository(WebApp.COMMENTS_PATH));
		}
	}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<ApartmentComment> getAll() {
		ApartmentCommentRepository commentRepository = (ApartmentCommentRepository) ctx
				.getAttribute("commentRepository");
		return commentRepository.getAll().values();
	}

	@GET
	@Path("/apartment/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<ApartmentComment> getApartmentComments(@PathParam("id") long id) {
		ApartmentCommentRepository commentRepository = (ApartmentCommentRepository) ctx
				.getAttribute("commentRepository");
		Collection<ApartmentComment> apartmentComments = new ArrayList<ApartmentComment>();
		for (ApartmentComment comment : commentRepository.getAll().values()) {
			if (comment.getApartmentId() == id) {
				apartmentComments.add(comment);
			}
		}
		return apartmentComments;
	}
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ApartmentComment save(ApartmentComment comment) {
		ApartmentCommentRepository commentRepository = (ApartmentCommentRepository) ctx
				.getAttribute("commentRepository");
		try {
			return commentRepository.save(comment);
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") long id) {
		ApartmentCommentRepository commentRepository = (ApartmentCommentRepository) ctx
				.getAttribute("commentRepository");
		try {
			commentRepository.delete(id);
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

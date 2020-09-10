package services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import util.ImageSequencer;

@Path("/images")
public class ImageService {
	@Context
	ServletContext ctx;
	public static final String APP_PATH = System.getProperty("catalina.base") + "/wtpwebapps/apartmani-web/";
	public static final String RELATIVE_IMAGES_PATH = "resources/images/";
	
	public ImageService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("imageSequencer") == null) {
			ctx.setAttribute("imageSequencer", new ImageSequencer(APP_PATH + RELATIVE_IMAGES_PATH));
		}
	}

	@POST
	@Path("/{type}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response uploadImage(InputStream stream, @PathParam("type") String type) {
		if (!type.equals("png") && !type.equals("jpg")) {
			return Response.status(400).entity("Unsupported file type.").build();
		}
		ImageSequencer sequencer = (ImageSequencer)ctx.getAttribute("imageSequencer");
		long imageId = sequencer.generateId();
		String fileLocation = APP_PATH + RELATIVE_IMAGES_PATH + imageId + "." + type;
		try {
			writeToFile(stream, fileLocation);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(RELATIVE_IMAGES_PATH + imageId + "." + type).build();
	}
	
	private void writeToFile(InputStream stream, String fileLocation) throws IOException {
		File file = new File(fileLocation);
		OutputStream out = new FileOutputStream(file);
		int read = 0;
		byte[] bytes = new byte[1024];
		
		while ((read = stream.read(bytes)) != -1) {
			out.write(bytes, 0, read);
		}
		out.flush();
		out.close();
	}
}

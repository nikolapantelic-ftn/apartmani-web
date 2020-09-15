package app;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/rest")
public class WebApp extends Application {
	public static final String GUESTS_PATH = "/home/nikola/apartmani-db/guestdb.json";
	public static final String HOSTS_PATH = "/home/nikola/apartmani-db/hostdb.json";
	public static final String APARTMENTS_PATH = "/home/nikola/apartmani-db/apartmentdb.json";
	public static final String ADMIN_PATH="/home/nikola/apartmani-db/admindb.json";
	public static final String COMMENTS_PATH = "/home/nikola/apartmani-db/comments.json";
	public static final String AMENITY_PATH = "/home/nikola/apartmani-db/ameities.json";
	public static final String IMAGES_LOCATION = "/home/nikola/apartmani-db/images";
	public static final String RESERVATIONS_PATH = "/home/nikola/apartmani-db/reservations.json";
}

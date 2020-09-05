package app;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/rest")
public class WebApp extends Application {
	public static final String GUESTS_PATH = "C:/Data/guestdb.json";
	public static final String HOSTS_PATH = "C:/Data/hostdb.json";
	public static final String APARTMENTS_PATH = "C:/Data/apartmentdb.json";
	public static final String ADMIN_PATH="C:/Data/admindb.json";
	public static final String COMMENTS_PATH = "C:/Data/comments.json";
	public static final String AMENITY_PATH = "C:/Data/ameities.json";
}

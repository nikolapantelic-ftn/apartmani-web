package app;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/rest")
public class WebApp extends Application {
	public static final String GUESTS_PATH = "guestdb.json";
	public static final String HOSTS_PATH = "hostdb.json";
	public static final String APARTMENTS_PATH = "apartmentdb.json";
	public static final String ADMIN_PATH="admindb.json";
}

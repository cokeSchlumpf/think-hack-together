package ws;

import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import model.AuthRequest;
import model.AuthResponse;

@Path("auth")
public class AuthService {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AuthResponse auth(AuthRequest request) {
		System.out.println(request);
		return new AuthResponse(UUID.randomUUID().toString());
	}
	
}

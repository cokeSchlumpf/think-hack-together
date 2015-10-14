package ws;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import model.Idea;

@Path("ideas")
public class IdeasService {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.WILDCARD)
	public List<Idea> getIdeas() {
		List<Idea> result = new ArrayList<>();
		result.add(new Idea(1, "light-orange", new Date(), 120, "Tom Weber", new String[] { "Mobile", "Cloud" }, "Lorem Ipsum", "Munich", "Hackathon"));
		result.add(new Idea(2, "light-orange", new Date(), 120, "Kevin", new String[] { "Mobile", "Cloud" }, "Lorem Ipsum", "Mumbai", "Hackathon"));
		result.add(new Idea(3, "light-orange", new Date(), 120, "Jean Valjean", new String[] { "Mobile", "Cloud" }, "Lorem Ipsum", "Paris", "Hackathon"));
		return result;
	}
	
}

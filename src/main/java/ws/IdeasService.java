package ws;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.ejb.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.Idea;

@Path("ideas")
@Singleton
public class IdeasService {

	private List<Idea> ideas = new ArrayList<Idea>() {

		/**
		 * 
		 */
		private static final long serialVersionUID = 8302359784206184799L;

		{
			add(new Idea(1, "light-orange", new Date(), 120, "Tom Weber", new String[] { "Mobile", "Cloud" },
					"Lorem Ipsum", "Munich", "Hackathon"));
			add(new Idea(2, "light-orange", new Date(), 120, "Kevin", new String[] { "Mobile", "Cloud" }, "Lorem Ipsum",
					"Mumbai", "Hackathon"));
			add(new Idea(3, "light-orange", new Date(), 120, "Jean Valjean", new String[] { "Mobile", "Cloud" },
					"Lorem Ipsum", "Paris", "Hackathon"));
		}
	};

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response create(Idea entity) {
		Response result = null;

		entity.setId(this.ideas.size() + 1);
		if (this.ideas.add(entity)) {
			result = Response.status(Response.Status.CREATED).entity(entity).build();
		}

		return result;
	}

	@GET
	@Path("{id}")
	@Consumes(MediaType.WILDCARD)
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@PathParam("id") int id) {
		Response result = null;

		Optional<Idea> found = this.ideas.stream().filter(idea -> idea.getId() == id).findFirst();

		if (found.isPresent()) {
			result = Response.ok(found.get()).build();
		} else {
			result = Response.status(Response.Status.NOT_FOUND).entity("Idea not found for ID: " + id).build();
		}

		return result;
	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("id") int id, final Idea entity) {
		Response result = null;

		Optional<Idea> found = this.ideas.stream().filter(idea -> idea.getId() == entity.getId()).findFirst();

		if (found.isPresent()) {
			this.ideas.remove(found.get());
			this.ideas.add(entity);

			result = Response.ok(entity).build();
		} else {
			result = Response.status(Response.Status.NOT_FOUND).entity("Idea not found for ID: " + entity.getId())
					.build();
		}

		return result;
	}

	@DELETE
	@Path("{id}")
	@Consumes(MediaType.WILDCARD)
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") int id) {
		Response result = null;

		Optional<Idea> found = this.ideas.stream().filter(idea -> idea.getId() == id).findFirst();

		boolean removed = false;

		if (found.isPresent()) {
			removed = this.ideas.removeIf(idea -> idea.getId() == id);
		}

		if (removed) {
			result = Response.ok(found.get()).build();
		} else {
			result = Response.status(Response.Status.NOT_FOUND).entity("Idea not found for ID: " + id).build();
		}

		return result;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.WILDCARD)
	public List<Idea> getIdeas() {
		return this.ideas;
	}

}

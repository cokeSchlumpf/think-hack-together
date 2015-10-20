package ws.exceptions;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import model.WebApplicationExceptionDetail;

abstract class WebApplicationException extends javax.ws.rs.WebApplicationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6768083857142286359L;

	public WebApplicationException(Throwable cause, long code, String message, String key, String[] parameters, Status status) {
		super(cause,
				Response.status(status) //
						.entity(new WebApplicationExceptionDetail(String.format(message, (Object[]) parameters), key, code,
								parameters)) //
						.type(MediaType.APPLICATION_JSON) //
						.build());
	}

	public WebApplicationException(Throwable cause, long code, String message, String key, String... parameters) {
		this(cause, code, message, key, parameters, Status.BAD_REQUEST);
	}
	
	public WebApplicationException(long code, String message, String key, String... parameters) {
		this(null, code, message, key, parameters);
	}
}

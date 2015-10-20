package ws.exceptions;

public class SampleException extends WebApplicationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6966179032883302062L;

	public SampleException() {
		super(1001l, "Sample Exception", "EXCEPTION.SAMPLE", "halloooooo");
	}
	
}

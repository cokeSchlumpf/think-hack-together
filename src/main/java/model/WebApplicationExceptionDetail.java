package model;

import java.util.Arrays;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlType;

@XmlType(propOrder = { "message", "code", "parameters" })
@XmlAccessorType(XmlAccessType.FIELD)
public class WebApplicationExceptionDetail {

	@XmlElement(name = "message", required = true)
	private String message;
	
	@XmlElement(name = "key", required = true)
	private String key;
	
	@XmlElement(name = "code", required = true)
	private long code;
	
	@XmlElementWrapper(name = "parameters")
	@XmlElement(name = "parameter")
	private List<String> parameters;
	
	protected WebApplicationExceptionDetail() {
		
	}
	
	public WebApplicationExceptionDetail(String message, String key, long code, String ... parameters) {
		this();
		this.message = message;
		this.code = code;
		this.key = key;
		this.parameters = Arrays.asList(parameters);
	}

	public long getCode() {
		return code;
	}
	
	public String getKey() {
		return key;
	}
	
	public String getMessage() {
		return message;
	}
	
	public List<String> getParameters() {
		return parameters;
	}
	
	public void setCode(long code) {
		this.code = code;
	}
	
	public void setKey(String key) {
		this.key = key;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public void setParameters(List<String> parameters) {
		this.parameters = parameters;
	}
	
}

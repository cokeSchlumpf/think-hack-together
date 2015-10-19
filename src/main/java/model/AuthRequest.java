package model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlType(propOrder = { "username", "password" })
@XmlAccessorType(XmlAccessType.FIELD)
public class AuthRequest {

	@XmlElement(name = "username", required = true)
	private String username;
	
	@XmlElement(name = "password", required = true)
	private String password;

	public AuthRequest() {
		
	}
	
	public AuthRequest(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	
	public String getPassword() {
		return password;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "AuthRequest [username=" + username + ", password=" + password + "]";
	}
	
}

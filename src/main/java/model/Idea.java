package model;

import java.util.Date;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlType;

@XmlType(name = "idea")
@XmlAccessorType(XmlAccessType.FIELD)
public class Idea {

	@XmlElement(name = "id")
	private int id;
	
	@XmlElement(name = "color")
	private String color;
	
	@XmlElement(name = "date")
	private Date date;
	
	@XmlElement(name = "likes")
	private int likes;
	
	@XmlElement(name = "organizer")
	private String organizer;
	
	@XmlElementWrapper(name = "tags")
	@XmlElement(name = "tag")
	private String[] tags;
	
	@XmlElement(name = "title")
	private String title;
	
	@XmlElement(name = "town")
	private String town;
	
	@XmlElement(name = "type")
	private String type;
	
	public Idea() {
		
	}

	public Idea(int id, String color, Date date, int likes, String organizer, String[] tags, String title, String town,
			String type) {
		this();
		this.id = id;
		this.color = color;
		this.date = date;
		this.likes = likes;
		this.organizer = organizer;
		this.tags = tags;
		this.title = title;
		this.town = town;
		this.type = type;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public String getOrganizer() {
		return organizer;
	}

	public void setOrganizer(String organizer) {
		this.organizer = organizer;
	}

	public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTown() {
		return town;
	}

	public void setTown(String town) {
		this.town = town;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}

package ru.n11ceo.vuemastery.realworld.entities;

import java.util.List;

public class Event {

    public Event(long id, User user, String category, User organizer, String title, String description, String location, String date, String time, List<User> attendees) {
        Id = id;
        this.user = user;
        this.category = category;
        this.organizer = organizer;
        this.title = title;
        this.description = description;
        this.location = location;
        this.date = date;
        this.time = time;
        this.attendees = attendees;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public User getOrganizer() {
        return organizer;
    }

    public void setOrganizer(User organizer) {
        this.organizer = organizer;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public List<User> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<User> attendees) {
        this.attendees = attendees;
    }

    private long Id;

    private User user;

    private String category;
    private User organizer;
    private String title;
    private String description;
    private String location;
    private String date;
    private String time;

    private List<User> attendees;
}

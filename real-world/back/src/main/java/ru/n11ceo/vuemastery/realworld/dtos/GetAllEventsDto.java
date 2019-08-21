package ru.n11ceo.vuemastery.realworld.dtos;

import ru.n11ceo.vuemastery.realworld.entities.Event;

import java.util.List;

public class GetAllEventsDto {

    public GetAllEventsDto(List<Event> events) {
        this.events = events;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    private List<Event> events;
}

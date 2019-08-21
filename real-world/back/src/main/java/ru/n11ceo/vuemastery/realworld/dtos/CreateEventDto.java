package ru.n11ceo.vuemastery.realworld.dtos;

import ru.n11ceo.vuemastery.realworld.entities.Event;

public class CreateEventDto {
    public CreateEventDto(Event event) {
        this.event = event;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    private Event event;
}

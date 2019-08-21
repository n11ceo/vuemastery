package ru.n11ceo.vuemastery.realworld;

import ru.n11ceo.vuemastery.realworld.dtos.CreateEventDto;
import ru.n11ceo.vuemastery.realworld.dtos.GetAllEventsDto;
import ru.n11ceo.vuemastery.realworld.entities.Event;

import java.util.List;

public interface EventsService {
    List<Event> getAllEvents();

    Event getEvent(long id);

    Event createEvent(Event event);
}

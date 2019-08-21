package ru.n11ceo.vuemastery.realworld;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.n11ceo.vuemastery.realworld.dtos.CreateEventDto;
import ru.n11ceo.vuemastery.realworld.dtos.GetAllEventsDto;
import ru.n11ceo.vuemastery.realworld.entities.Event;

import java.util.List;

@RestController
@CrossOrigin
public class EventsController {

    private EventsService service;

    @Autowired
    public EventsController(EventsService service) {
        this.service = service;
    }

    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return service.getAllEvents();
    }

    @GetMapping("/events/{id}")
    public Event getEvent(@PathVariable("id") long id) {
        return service.getEvent(id);
    }

    @PostMapping("/events")
    public void createEvent(@RequestBody Event event) {
        service.createEvent(event);
    }

}

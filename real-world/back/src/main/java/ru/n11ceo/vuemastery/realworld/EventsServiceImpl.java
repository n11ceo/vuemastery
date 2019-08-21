package ru.n11ceo.vuemastery.realworld;

import org.springframework.stereotype.Service;
import ru.n11ceo.vuemastery.realworld.dtos.CreateEventDto;
import ru.n11ceo.vuemastery.realworld.entities.Event;
import ru.n11ceo.vuemastery.realworld.entities.User;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventsServiceImpl implements EventsService {

    public List<Event> events;

    @PostConstruct
    private void init() {
        events = new ArrayList<>();
        events.add(new Event(
                5928101,
                new User("abc123", "Adam"),
                "animal welfare",
                new User("abc123", "Adam"),
                "Cat Cabaret",
                "Yay felines!",
                "Meow Town",
                "Aug 28 2018",
                "2:00",
                new ArrayList<>()
        ));
        events.add(new Event(
                8419988,
                new User("abc123", "Adam"),
                "animal welfare",
                new User("abc123", "Adam"),
                "Kitty Cluster",
                "Yay cats!",
                "Catlandia",
                "Nov 12 2018",
                "7:00",
                new ArrayList<>()
        ));
        events.add(new Event(
                4582797,
                new User("abc123", "Adam"),
                "animal welfare",
                new User("abc123", "Adam"),
                "Puppy Parade",
                "Yay pups!",
                "Puptown",
                "Dec 2018",
                "1:00",
                new ArrayList<>()
        ));
    }

    public List<Event> getAllEvents() {
        return events;
    }

    @Override
    public Event getEvent(long id) {
        return events.stream()
                .filter(event -> (event.getId() == id))
                .findFirst()
                .orElseThrow();
    }

    @Override
    public Event createEvent(Event event) {
        events.add(event);
        return event;
    }
}

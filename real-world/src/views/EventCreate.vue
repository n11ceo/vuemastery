<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <div class="field">
        <label for="category">Select a category</label>
        <select name="category" id="category" v-model="event.category">
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
      </div>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="event.title" />
      </div>
      <div class="field">
        <label for="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          v-model="event.description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label for="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          v-model="event.location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label for="date">Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times: times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>

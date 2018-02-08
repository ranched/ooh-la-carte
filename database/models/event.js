const knex = require('../index');

const Event = {};

Event.findAllEvents = () => (
  knex('events')
    .then((results) => {
      console.log('event:findall - all events queried');
      return results;
    })
    .catch((err) => { console.log(err); })
);

Event.findAllEventsByUserId = userId => (
  knex('events')
    .where({ creator_id: userId })
    .then((results) => {
      console.log('event:findByUserId - events by userId queried');
      return results;
    })
);

Event.findAllEventsByField = (field, target) => (
  knex('events')
    .where(field, target)
    .then((results) => {
      console.log('event:findByField - events by field queried');
      return results;
    })
);


Event.insertEvent = (eventObj) => {
  const { eventName,
    hostId,
    hostUsername,
    city,
    stat,
    zip,
    month,
    date,
    year,
    cuisine,
    budget,
    description,
    partySize,
    meal } = eventObj;

  return knex('events').insert({
    name: eventName,
    creator_id: hostId,
    creator_username: hostUsername,
    city,
    state: stat,
    zip_code: zip,
    date_time: (`${year}-${month}-${date} 00:00:00`),
    cuisine_type: cuisine,
    budget,
    description,
    party_size: partySize,
    meal_type: meal,
  })
    .then((insertResult) => {
      console.log('event:insert - event sucessfully inserted');
      return insertResult;
    })
    .catch(err => console.log('error inserting event into database: ', err));
};

// This function accepts an object with an event
// id and a rating to update the rating of the chef
// who provided their services for the event

Event.updateRating = ratingObj => (
  knex('events')
    .where('id', ratingObj.eventId)
    .update('rating', ratingObj.rating)
    .then((updateResult) => {
      console.log('event:update - event rating updated');
      return updateResult;
    })
    .catch(err => console.log('error inserting event into database: ', err))
);


module.exports = Event;

const knex = require('../index');
const bcrypt = require('bcrypt');

const User = {};


User.findUserByName = username => (
  knex('users')
    .where({ username })
    .then(data => data)
    .catch((err) => { console.log(err); })
);

User.findUserByGoogleId = googleId => (
  knex('users')
    .where({ google_id: googleId })
    .then()
);

// the info object should have
// { idType: 'facebook_id | google_id', id: 'id', name: 'name', img: 'url | undefined' }
// returns a promise
User.insertOAuth = (info) => {
  const row = { name: info.name };
  row[info.idType] = info.id;
  row.img = info.img;

  return knex('users').insert(row).then();
};

User.findChefs = () => (
  knex('users').where('is_chef', true)
);

User.findUserById = id => (
  knex('users').where('id', id).select('is_chef', 'street_name', 'city', 'state', 'zip_code', 'name', 'phone', 'email', 'id', 'rate', 'cuisine', 'username').then()
);

User.insertUser = (username, password, email, accType) => {
  let isAChef = false;

  if (accType === 'chef') isAChef = true;
  return bcrypt.hash(password, 10)
    .then(hash => (
      knex('users').insert({
        username,
        password: hash,
        email,
        is_chef: isAChef,
      })
    ))
    .then((insertResult) => {
      console.log('user sucessfully inserted');
      return insertResult;
    })
    .then(() => User.findUserByName(username))
    .then(data => ({
      userId: data[0].id,
      isChef: data[0].is_chef,
      username: data[0].username,
    }))
    .catch((err) => { console.log(err); });
};

User.insertContactInfo = (id, name, streetAddress, city, state, zipcode, phone, email) => knex('users')
  .where('id', id)
  .update({
    name, street_name: streetAddress, city, state, zip_code: zipcode, phone, email,
  });

User.updateCuisineSelection = (id, cuisine) => knex('users')
  .where('id', id)
  .update({ cuisine });

User.updateChefRate = (id, rate) => knex('users')
  .where('id', id)
  .update({ rate });

User.getAndVerifyUser = (username, password) => {
  let userId;
  let isChef;
  return User.findUserByName(username)
    .then((results) => {
      userId = results[0].id;
      isChef = results[0].is_chef;
      return bcrypt.compare(password, results[0].password);
    })
    .then(result => (result ? ({
      userId,
      isChef,
      username,
    }) : null))
    .catch((err) => { console.log(err); });
};

module.exports = User;

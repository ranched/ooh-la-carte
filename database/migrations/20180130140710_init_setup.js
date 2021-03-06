
exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.boolean('is_chef');
      table.string('street_name');
      table.string('city');
      table.string('state');
      table.string('zip_code');
      table.string('name');
      table.string('username').unique();
      table.string('phone');
      table.string('cuisine');
      table.string('password');
      table.string('menu');
      table.string('img');
      table.string('availability');
      table.string('rate');
      table.string('bio');
      table.string('twitter');
      table.string('facebook');
      table.string('instagram');
      table.string('rating');
      table.string('email');
      table.string('google_id');
      table.string('facebook_id').unique();
      table.timestamp('last_prompted');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    }),
    knex.schema.createTable('conversations', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('chef_id').unsigned().references('users.id');
      table.string('last_updated');
      table.string('formatted_time');
    }),
    knex.schema.createTable('messages', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('conversation_id').unsigned().references('conversations.id');
      table.text('text');
      table.boolean('self');
      table.string('time_sent');
    }),
    knex.schema.createTable('events', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('creator_id').unsigned().notNullable().references('users.id');
      table.string('creator_username');
      table.integer('chef_id').unsigned().references('users.id');
      table.string('name');
      table.string('party_size').notNullable();
      table.string('street_name');
      table.string('city');
      table.string('state');
      table.string('zip_code');
      table.decimal('budget');
      table.string('cuisine_type');
      table.timestamp('date_time');
      table.string('meal_type');
      table.text('description');
      table.text('img').defaultTo('/img/backyardEvent.jpg');
      table.string('rating');
      table.text('requests');
    }),
    knex.schema.createTable('menu', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('chef_id').unsigned().references('users.id');
      table.string('pic');
      table.string('menu_name');
      table.text('description');
      table.string('cuisine_type');
    }),
    knex.schema.createTable('users_cuisines', (table) => {
      table.increments('id').unsigned().primary();
      table.string('cuisine');
      table.integer('chef_id').unsigned().references('users.id');
      table.string('custom_description');
    }),
    knex.schema.createTable('invitations', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('user_id').unsigned().references('users.id');
      table.string('host');
      table.string('chef');
      table.string('sender');
      table.string('event_name');
      table.integer('chef_id').unsigned().references('users.id');
      table.integer('event_id').unsigned().references('events.id');
      table.boolean('accepted');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('conversations'),
    knex.schema.dropTable('chat_subscriber'),
    knex.scheam.dropTable('messages'),
    knex.schema.dropTable('events'),
    knex.schema.dropTable('menu'),
  ])
);

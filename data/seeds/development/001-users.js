const faker = require("faker");
const createFakeUserSeattle = () => ({
  googleId: null,
  facebookId: null,
  goodreadsId: null,
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  latitude: generateRandomPoints({ lat: 47.6, lng: -122.33 }, 7000, 1)[0].lat,
  longitude: generateRandomPoints({ lat: 47.6, lng: -122.33 }, 7000, 1)[0].lng,
  picture: faker.random.image(),
  bio: faker.lorem.sentence()
});

const createFakeUserChicago = () => ({
  googleId: null,
  facebookId: null,
  goodreadsId: null,
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  latitude: generateRandomPoints({ lat: 41.87, lng: -87.629 }, 7000, 1)[0].lat,
  longitude: generateRandomPoints({ lat: 41.87, lng: -87.629 }, 7000, 1)[0].lng,
  picture: faker.random.image(),
  bio: faker.lorem.sentence()
});

const createFakeUserPortland = () => ({
  googleId: null,
  facebookId: null,
  goodreadsId: null,
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  latitude: generateRandomPoints({ lat: 45.523, lng: -122.679 }, 7000, 1)[0]
    .lat,
  longitude: generateRandomPoints({ lat: 45.523, lng: -122.679 }, 7000, 1)[0]
    .lng,
  picture: faker.random.image(),
  bio: faker.lorem.sentence()
});

const createFakeUserToronto = () => ({
  googleId: null,
  facebookId: null,
  goodreadsId: null,
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  latitude: generateRandomPoints({ lat: 43.653, lng: -79.383 }, 7000, 1)[0].lat,
  longitude: generateRandomPoints({ lat: 43.653, lng: -79.383 }, 7000, 1)[0]
    .lng,
  picture: faker.random.image(),
  bio: faker.lorem.sentence()
});

const createFakeUserAshville = () => ({
  googleId: null,
  facebookId: null,
  goodreadsId: null,
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  latitude: generateRandomPoints({ lat: 35.595, lng: -82.551 }, 7000, 1)[0].lat,
  longitude: generateRandomPoints({ lat: 35.595, lng: -82.551 }, 7000, 1)[0]
    .lng,
  picture: faker.random.image(),
  bio: faker.lorem.sentence()
});
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let fakeUsers = [];
  for (let i = 1; i <= 20; i++) {
    fakeUsers.push(createFakeUserSeattle());
  }
  for (let i = 21; i <= 40; i++) {
    fakeUsers.push(createFakeUserChicago());
  }
  for (let i = 41; i <= 60; i++) {
    fakeUsers.push(createFakeUserPortland());
  }
  for (let i = 61; i <= 80; i++) {
    fakeUsers.push(createFakeUserToronto());
  }
  for (let i = 81; i <= 90; i++) {
    fakeUsers.push(createFakeUserAshville());
  }
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert(fakeUsers);
    });
};

/*
 * @param  {Object} center A JS object with lat and lng attributes.
 * @param  {number} radius Radius in meters.
 * @param {number} count Number of points to generate.
 * @return {array} Array of Objects with lat and lng attributes.
 */
function generateRandomPoints(center, radius, count) {
  var points = [];
  for (var i = 0; i < count; i++) {
    points.push(generateRandomPoint(center, radius));
  }
  return points;
}

/**
 * Generates number of random geolocation points given a center and a radius.
 * Reference URL: http://goo.gl/KWcPE.
 * @param  {Object} center A JS object with lat and lng attributes.
 * @param  {number} radius Radius in meters.
 * @return {Object} The generated random points as JS object with lat and lng attributes.
 */
function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius / 111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x / Math.cos(y0);

  // Resulting point.
  return { lat: y + y0, lng: xp + x0 };
}

// Usage Example.
// Generates 100 points that is in a 1km radius from the given lat and lng point.
// var randomGeoPoints = generateRandomPoints(
//   { lat: 47.6, lng: -122.33 },
//   10000,
//   1
// );
// console.log(randomGeoPoints);

//import ModelsTr
const Traveller = require('./Traveller');
const Locations = require('./Locations');
// const Trip = require('./Trip');

//travellers have many locations
Traveller.hasMany(Locations);
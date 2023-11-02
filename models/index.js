//import ModelsTr
const Traveller = require('./Traveller');
const Location = require('./Location');
const Trip = require('./Trip');

//travellers have many locations
//Traveller.hasMany(Location);

//locations have many travellers through trips

// Location.hasMany(Traveller, {through: Trip });
Location.belongsToMany(Traveller, {through: Trip });

Traveller.belongsToMany(Location, {through: Trip });

module.exports = {
    Traveller,
    Location,
    Trip
}
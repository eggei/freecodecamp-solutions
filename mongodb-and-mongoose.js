/** 1) Install & Set up mongoose */

// Add mongodb and mongoose to the project's package.json. Then require
// mongoose. Store your Mongo Atlas database URI in the private .env file
// as MONGO_URI. Connect to the database using the following syntax:
//
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/** 2) Create a 'Person' Model */

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

/** 3) Create and Save a Person */

var createAndSavePerson = function(done) {
  const person = new Person({
    name: "Ece",
    age: 30,
    favoriteFood: ["pizza", "manti"]
  });
  person.save((err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

/** 4) Create many People with `Model.create()` */

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

var findPeopleByName = function(personName, done) {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

/** 6) Use `Model.findOne()` */

var findOneByFood = function(food, done) {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

/** 7) Use `Model.findById()` */

var findPersonById = function(personId, done) {
  Person.findById(personId, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

/** 8) Classic Update : Find, Edit then Save */

var findEditThenSave = function(personId, done) {
  var foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      done(null, data);
    });
  });
};

/** 9) New Update : Use `findOneAndUpdate()` */

var findAndUpdate = async function(personName, done) {
  var filter = { name: personName };
  var ageToSet = 20;
  var data = await Person.findOneAndUpdate(
    filter,
    { age: ageToSet },
    { new: true }
  );
  done(null, data);
};

/** 10) Delete one Person */

var removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, (err, data) => {
    done(null, data);
  });
};

/** 11) Delete many People */

var removeManyPeople = function(done) {
  Person.remove({ name: "Mary" }, (err, data) => {
    if (err) throw new Error(err);
    done(null, data);
  });
};


/** 12) Chain Query helpers */

var queryChain = function(done) {
  const query = Person.find({ favoriteFoods: "burrito" })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age");
  query.exec((err, data) => {
    if(err) return console.log(err)
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

/** # Further Readings... #
/*  ======================= */
// If you are eager to learn and want to go deeper, You may look at :
// * Indexes ( very important for query efficiency ),
// * Pre/Post hooks,
// * Validation,
// * Schema Virtuals and  Model, Static, and Instance methods,
// * and much more in the [mongoose docs](http://mongoosejs.com/docs/)

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;


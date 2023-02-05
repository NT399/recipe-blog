const db = require('../config/connection');
const { User, Creation } = require('../models');
const userSeeds = require('./userSeeds.json');
const creationSeeds = require('./creationSeeds.json');

db.once('open', async () => {
  try {
    await Creation.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < creationSeeds.length; i++) {
      const { _id, creationAuthor } = await Creation.create(creationSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: creationAuthor },
        {
          $addToSet: {
            creations: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Seeding complete');
  process.exit(0);
});

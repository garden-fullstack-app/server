'use strict';

const PlantModel = require("./plantModel.js");

const Seed = {};

Seed.seedDb = (req, res) => {
  const seedArr = [
    {
      plantName: 'asparagus',
      plantFamily: 'asparagus',
      determinate: true,
      directSowDate: "10/31/2022",
      daysToMaturity: 45,
      harvestCountdown: "",
      lightRequirements: 'Full Sun',
      fertilizing: { fertilizer: 'NPK' },
      companionPlants: [],
      enemyPlants: [],
      cropImage: 'https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/551dc1e837323900036a0100.jpg?1428013539',
      plantDescription: 'Perennial spring vegetable often sown from crowns. The vegetable has a mild flavor with earthy undertones. When mature and reproducing, the plant creates tall, stout stems with feathery foliage and small red berries.',
      plantSowMethod: 'None',
      medianDaysToFirstHarvest: 38,
      medianDaysToLastHarvest: 56
    },
    {
      plantName: 'dragon fruit',
      plantFamily: 'dragon fruit',
      determinate: true,
      directSowDate: "11/12/2022",
      daysToMaturity: 97,
      harvestCountdown: "",
      lightRequirements: 'Light Sun',
      fertilizing: { fertilizer: 'NPK' },
      companionPlants: [],
      enemyPlants: [],
      cropImage: 'https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/576b7961fe8d750003000386.jpg?1466661212',
      plantDescription: 'Hylocereus undatus is a vine-like cactus that is often grown as a night-flowering ornamental plant and as a fruit crop. The fruit is highly decorative, with a bright red skin, studded with green scales. The flesh is white, juicy and delicious in flavour, with tiny black seeds. Its exact native range is uncertain but is considered to be in Central America. Since the late twentieth century it has been widely planted on a commercial scale as a fruit crop in many tropical regions, particularly in Vietnam and other South-East Asian countries, and has escaped widely from cultivation, become naturalized and in many instances become an invasive weed, sometimes threatening native plants and habitats.',
      plantSowMethod: 'None',
      medianDaysToFirstHarvest: 90,
      medianDaysToLastHarvest: 112
    },
    {
      plantName: 'jicama',
      plantFamily: 'jicama',
      determinate: true,
      directSowDate: "08/27/2022",
      daysToMaturity: 300,
      harvestCountdown: "",
      lightRequirements: 'Full Sun',
      fertilizing: { fertilizer: 'NPK' },
      companionPlants: [],
      enemyPlants: [],
      cropImage: 'https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/59f283f233d94e0004000004.jpg?1509065711',
      plantDescription: 'Jicama is an annual, tropical vine species in the bean family (Fabaceae) grown for its edible tuberous root. The plant is native to Mexico and Central America.The plant\'s vines can reach heights of 4-5 m and need trellising. The root can grow to 2 m long and weigh up to 20 kg. Each plant produces 4-5 roots. The clusters of blue or white flowers can be pinched off to direct the plant\'s energy towards tubers rather than seed. The roots have thick brown skin and look like large round turnips.The flesh is creamy white and has a crisp texture and mildly sweet taste like apples or raw green beans. The skin is peeled and the flesh is eaten raw grated or sliced. Jicama is frost- tender and needs at least 5 - 9 frost - free months after transplanting to develop good sized roots. Seed can be sown any time of the year in tropical regions. In cooler regions, start seeds indoors to extend the growing season, and grow jicama in a greenhouse or in containers. Tubers are the only edible part of the plant: the seeds, vines, leaves, and flowers are poisonous.',
      plantSowMethod: 'None',
      medianDaysToFirstHarvest: 270,
      medianDaysToLastHarvest: 360
    }


  ]
  seedArr.forEach(seed => {
    let entry = new PlantModel(seed);
    entry.save();
  })
  res.status(200).send('seeded the database');
};

module.exports = Seed;
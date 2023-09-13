const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64f896242b2189b88759c87c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,
                cities[random1000].longitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dcuwziwkc/image/upload/v1694184607/YelpCamp/qbgtiuczptc0ndarzymh.jpg',
                    filename: 'YelpCamp/qbgtiuczptc0ndarzymh'

                },
                {
                    url: 'https://res.cloudinary.com/dcuwziwkc/image/upload/v1694184643/YelpCamp/hvua5sxotwpcez8upnmi.jpg',
                    filename: 'YelpCamp/hvua5sxotwpcez8upnmi'
                },
                {
                    url: 'https://res.cloudinary.com/dcuwziwkc/image/upload/v1694184646/YelpCamp/xw3csnxwwxemj5l8olfb.jpg',
                    filename: 'YelpCamp/xw3csnxwwxemj5l8olfb'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
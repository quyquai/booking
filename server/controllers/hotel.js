const Hotel = require('../models/hotel');
const Room = require('../models/room');

const getAvailableRooms = require('../utils/availableRooms')

exports.getCountByCity = async (req, res) => {
  const cities = ['Ha Noi', 'Ho Chi Minh', 'Da Nang'];
  
  try {
    const hotels = await Hotel.find();
    const cityCount = cities.reduce((acc, city) => {
      acc[city] = hotels.filter(hotel => hotel.city === city).length;
      return acc;
    }, {});
    
    res.status(200).json(cityCount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCountByType = async (req, res) => {
  const hotelTypes = ['Hotel', 'Apartments', 'Resorts', 'Villas', 'Cabins'];
  
  try {
    const hotels = await Hotel.find();
    const typeCount = hotelTypes.reduce((acc, type) => {
      acc[type] = hotels.filter(hotel => hotel.type.toLowerCase() === type.toLowerCase()).length;
      return acc;
    }, {});
    
    res.status(200).json(typeCount);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCountByRating = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ rating: -1 }).limit(3);
    res.status(200).json(hotels);
  } catch (err) {
    console.error("Error fetching hotels:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getHotelSearch = async (req, res) => {
  const { city, dateStart, dateEnd, numberOfRooms } = req.query;

  try {
    const hotels = await Hotel.find({ city: { $regex: new RegExp(city, "i") } }).populate('rooms');

    const availableHotelsPromises = hotels.map(async (hotel) => {
      const availableRooms = await getAvailableRooms(hotel, dateStart, dateEnd);
      if (availableRooms.length >= numberOfRooms) {
        return hotel;
      }
      return null;
    });

    const availableHotelsResults = await Promise.all(availableHotelsPromises);
    const availableHotels = availableHotelsResults.filter(hotel => hotel !== null);

    res.status(200).json(availableHotels);
  } catch (err) {
    console.error('Error in getHotelSearch:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getHotels = async (req, res) => {
  const hotelId = req.params.id;
  
  try {
    const hotel = await Hotel.findById(hotelId).populate('rooms');
    res.status(200).json(hotel);
  } catch (err) {
    console.error("Error fetching hotel:", err);
    res.status(500).json({ error: err.message });
  }
};


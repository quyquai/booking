const Transaction = require('../models/transaction');
const User = require('../models/user');
const Hotel = require('../models/hotel');
const Room = require('../models/room');

exports.getInfo = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const transactionCount = await Transaction.countDocuments();
    const totalRevenue = await Transaction.aggregate([{ $group: { _id: null, total: { $sum: '$price' } } }]);
    const averageMonthlyRevenue = await Transaction.aggregate([
      { $group: { _id: { $month: '$dateStart' }, total: { $sum: '$price' } } },
      { $group: { _id: null, average: { $avg: '$total' } } },
    ]);

    res.status(200).json({
      userCount,
      transactionCount,
      totalRevenue: totalRevenue[0]?.total || 0,
      averageMonthlyRevenue: averageMonthlyRevenue[0]?.average || 0,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getTransactions = (req, res, next) => {
  Transaction.find()
    .populate('hotel')
    .populate('user')
    .then((transaction) => {
      res.status(200).json(transaction);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server Error', error: err.message });
    });
};

exports.getHotels = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      res.status(200).json(hotels);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server Error', error: err.message });
    });
};

exports.getRooms = (req, res, next) => {
  Room.find()
    .then((rooms) => {
      res.status(200).json(rooms);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server Error', error: err.message });
    });
};

exports.postHotel = (req, res, next) => {
  const { name, type, city, address, distance, photos, desc, featured, rooms, title } = req.body;
  try {
    if (
      !name ||
      !type ||
      !city ||
      !address ||
      !distance ||
      !photos ||
      !desc ||
      !featured ||
      !title ||
      !rooms.length > 0
    ) {
      res.status(400).json({ message: 'Please enter full hotel information' });
    }
    const typeLowerCase = type.toLowerCase();

    let photosArr = photos.split('\n');

    const hotel = new Hotel({
      name,
      type: typeLowerCase,
      city,
      title,
      address,
      distance,
      photos: photosArr,
      desc,
      featured,
      rooms,
    });

    hotel.save();
    res.status(200).json({ message: 'Added hotels successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.postRoom = async (req, res, next) => {
  try {
    const { title, price, maxPeople, desc, rooms, hotelId } = req.body;
    const roomNumbers = rooms.split('\n');
    const room = new Room({ title, price, maxPeople, desc, roomNumbers });
    await room.save();
    const hotel = await Hotel.findByIdAndUpdate({ _id: hotelId }, { $push: { rooms: room._id } }, { new: true });
    res.status(200).json({ message: 'Added room successfully', hotel });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.postDeleteHotel = async (req, res, next) => {
  const hotelId = req.body.hotelId;
  try {
    const transaction = await Transaction.find({ hotel: hotelId });

    if (transaction.length > 0) {
      return res.status(405).json({ message: 'The hotel cannot be deleted because there is an existing transaction' });
    }

    const hotel = await Hotel.deleteOne({ _id: hotelId });

    res.status(200).json({ message: 'Added room successfully', hotel });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.postDeleteRoom = async (req, res, next) => {
  const roomId = req.body.roomId;
  try {
    const transaction = await Transaction.find({ room: roomId });
    console.log(transaction);
    if (transaction.length > 0) {
      return res.status(405).json({ message: 'The hotel cannot be deleted because there is an existing transaction' });
    }

    // const room = await Room.deleteOne({ _id: hotelId });
    // // console.log(hotel);
    // res.status(200).json({ message: 'Added room successfully', room });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

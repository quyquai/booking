const Hotel = require('../models/hotel');

const Transaction = require('../models/transaction');

exports.getRooms = async (req, res, next) => {
  const { id, dateStart, dateEnd } = req.query;

  // Kiểm tra tính hợp lệ của ngày
  if (!dateStart || !dateEnd) {
    return res.status(400).json({ message: 'Định dạng ngày không hợp lệ' });
  }



  try {
    const hotel = await Hotel.findById(id).populate('rooms');
    
    // Kiểm tra xem khách sạn có tồn tại không
    if (!hotel) {
      return res.status(404).json({ message: 'Khách sạn không tìm thấy' });
    }

    // console.log(hotel)

    // Tìm tất cả các phòng bị đặt trong khoảng thời gian
    const occupiedRooms = await Transaction.find({
      hotel: hotel._id,
      room: { $in: hotel.rooms.flatMap(room => room.roomNumbers) },
      $or: [
        { dateStart: { $lt: dateEnd }, dateEnd: { $gt: dateStart } },
        { dateStart: { $gte: dateStart, $lte: dateEnd } },
        { dateEnd: { $gte: dateStart, $lte: dateEnd } }
      ]
    }).distinct('room'); // Lấy danh sách phòng bị đặt

    // Lọc các phòng chưa bị đặt
    const availableRooms = hotel.rooms.flatMap(room => 
      room.roomNumbers.filter(roomNumber => !occupiedRooms.includes(roomNumber)).length > 0 
        ? { room, roomNumbers: room.roomNumbers.filter(roomNumber => !occupiedRooms.includes(roomNumber)) }
        : null
    ).filter(room => room !== null);


    
    res.status(200).json(availableRooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ!', error: err.message });
  }
};
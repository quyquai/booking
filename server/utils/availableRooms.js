const Transaction = require('../models/transaction');

async function getAvailableRooms(hotel, dateStart, dateEnd) {
  const availableRooms = [];

  try {
    // Chuyển đổi dateStart và dateEnd thành đối tượng Date
    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    // Query để tìm tất cả các giao dịch có xung đột với bất kỳ phòng nào của khách sạn này
    const transactions = await Transaction.find({
      hotel: hotel._id,
      $or: [
        { dateStart: { $lt: end }, dateEnd: { $gt: start } },
        { dateStart: { $gte: start, $lte: end } },
        { dateEnd: { $gte: start, $lte: end } }
      ]
    });

    // Lưu các số phòng bị chiếm dụng vào một tập hợp để dễ kiểm tra
    const occupiedRoomNumbers = new Set();
    for (const transaction of transactions) {
      for (const roomNumber of transaction.room) {
        occupiedRoomNumbers.add(roomNumber.toString());
      }
    }

    // Kiểm tra từng phòng của khách sạn xem có bị chiếm dụng không
    for (const room of hotel.rooms) {
      const availableRoomNumbers = room.roomNumbers.filter(roomNumber => !occupiedRoomNumbers.has(roomNumber.toString()));
      if (availableRoomNumbers.length > 0) {
        availableRooms.push({
          ...room._doc,  // Sao chép các thuộc tính hiện có của room
          roomNumbers: availableRoomNumbers  // Chỉ giữ lại các số phòng còn trống
        });
      }
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Error fetching transactions');
  }

  return availableRooms;
}

module.exports = getAvailableRooms;
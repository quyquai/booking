const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.postRegister = async (req, res, next) => {
  const { username, password, fullName, email, phoneNumber, isAdmin } = req.body;

  try {
    // Kiểm tra xem username hoặc email đã tồn tại chưa
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // Nếu username hoặc email đã tồn tại, gửi phản hồi lỗi
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword, fullName, phoneNumber, email, isAdmin });
    
    // Lưu người dùng mới nếu không có trùng lặp
    await user.save();
    res.status(201).json({ message: 'User registered successfully'});
  } catch (err) {
    // Xử lý lỗi và gửi phản hồi lỗi về cho client
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Please enter both username and password' });
  }

  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).json({ message: 'email or password is incorrect' });
    }
    const isMatch = await bcrypt.compare(password, user.password)
   
    if (!isMatch) {
      return res.status(400).json({ message: 'email or password is incorrect' });
    }

    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.postAdminRegister = async (req, res, next) => {
  const { username, email, password, fullName, phoneNumber, isAdmin } = req.body;
  console.log(username,email, password, fullName, phoneNumber, isAdmin)
  if (!username || !email || !password || !fullName || !phoneNumber || !isAdmin) {
    return res.status(400).json({ message: 'Please enter both username, password, fullName, phoneNumber, and isAdmin' });
  }
  try {
    const existingUser = await User.findOne({ username });
     if (existingUser) {
      // Nếu username hoặc email đã tồn tại, gửi phản hồi lỗi
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword, fullName, phoneNumber, email, isAdmin });
    
    // Lưu người dùng mới nếu không có trùng lặp
    await user.save();
    res.status(201).json({ message: 'User registered successfully'});
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }

}

exports.postAdminLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password ) {
    return res.status(400).json({ error: 'Please enter both username and password' });
  }
  try {
    const user = await User.findOne({ username })
    
    if (!user) {
      return res.status(400).json({ message: 'email or password is incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password)
   
    if (!isMatch) {
      return res.status(400).json({ message: 'email or password is incorrect' });
    }

    if (user.isAdmin === false) {
      return res.status(400).json({ message: 'email or password is incorrect' });
    }

    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


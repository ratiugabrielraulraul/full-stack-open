const config = require('../utils/config');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log('Provided Password:', password);


  const user = await User.findOne({ username });
  console.log('Stored Password Hash:', user.passwordHash);



  /**
   * We are checking whether the provided 'user' exists in db and if the password matches the password hash stored for that user
     bcrypt.compare - compares the provided password with the password hash stored in db for the user
   */
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);


  console.log('Password Correct:', passwordCorrect);
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  //If the password is correct, a token is created with the method jwt.sign
  const token = jwt.sign(userForToken, config.SECRET,
    { expiresIn: 60 * 60 }
  );

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter;
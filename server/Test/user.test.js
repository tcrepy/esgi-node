const User = require('../Models/UserSchema')

/* user */
let user = new User({
  lastname: 'john',
  firstname: 'smith',
  pseudo: 'jsmith',
  image: 'https://image.fr',
  email: 'maxime@gmail.com',
  password: 'pass1234',
})

test('Test validité user true', () => {
  expect(user.testIsValid()).toBe(true)
})

test('test sauvegarde utilisateur', () => {
  return user.save().then(u => {
    expect(u.pseudo).toBe('jsmith')
    User.remove({ _id : u._id})
  })
})

test('test sauvegarde utilisateur :: password bien crypté', () => {
  return user.save().then(u => {
    expect(u.password == 'pass1234').toBe(false)
  })
})

test('test sauvegarde utilisateur :: même pseudo', () => {
  let user2 = new User({
    lastname: 'john',
    firstname: 'smith',
    pseudo: 'jsmith',
    image: 'https://image.fr',
    email: 'maxime2@gmail.com',
    password: 'pass1234',
  })

  return user2.save().then(u => {})
  .catch(err => expect(JSON.stringify(err).indexOf("E11000 duplicate key error collection")).not.toBe(-1))
})

test('test sauvegarde utilisateur :: même mail', () => {
  let user3 = new User({
    lastname: 'john',
    firstname: 'smith',
    pseudo: 'jsmidth',
    image: 'https://image.fr',
    email: 'maxime@gmail.com',
    password: 'pass1234',
  })

  return user3.save().then(u => {})
  .catch(err => expect(JSON.stringify(err).indexOf("E11000 duplicate key error collection")).not.toBe(-1))
})

test('Test validité user false car pas de prénom', () => {
  user.firstname = null
  expect(user.testIsValid()).toBe(false)
  user.firstname = 'john'
})

test('Test validité user false car prénom vide', () => {
  user.firstname = ''
  expect(user.testIsValid()).toBe(false)
  user.firstname = 'john'
})

test('Test validité user false car pas de nom', () => {
  user.lastname = null
  expect(user.testIsValid()).toBe(false)
  user.lastname = 'smith'
})

test('Test validité user false car nom vide', () => {
  user.lastname = ''
  expect(user.testIsValid()).toBe(false)
  user.lastname = 'smith'
})

test('Test validité user false car pas de pseudo', () => {
  user.pseudo = null
  expect(user.testIsValid()).toBe(false)
  user.pseudo = 'jsmith'
})

test('Test validité user false car pseudo vide', () => {
  user.pseudo = ''
  expect(user.testIsValid()).toBe(false)
  user.pseudo = 'jsmith'
})

test("Test validité user false car pas d'image", () => {
  user.image = null
  expect(user.testIsValid()).toBe(false)
  user.image = 'https://image.fr'
})

test('Test validité user false car image vide', () => {
  user.image = ''
  expect(user.testIsValid()).toBe(false)
  user.image = 'https://image.fr'
})

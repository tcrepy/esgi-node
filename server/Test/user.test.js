const UserS = require("../Models/UserSchema");
const http = require('http');

/* user */
let user = new UserS({
  lastname: "john",
  firstname: "smith",
  pseudo: "jsmith",
  image: "https://image.fr"
});

test("Test validité user true", () => {
  expect(user.testIsValid()).toBe(true);
});

test("Test validité user false car pas de prénom", () => {
  user.firstname = null;
  expect(user.testIsValid()).toBe(false);
  user.firstname = "john";
});

test("Test validité user false car prénom vide", () => {
  user.firstname = "";
  expect(user.testIsValid()).toBe(false);
  user.firstname = "john";
});

test("Test validité user false car pas de nom", () => {
  user.lastname = null;
  expect(user.testIsValid()).toBe(false);
  user.lastname = "smith";
});

test("Test validité user false car nom vide", () => {
  user.lastname = "";
  expect(user.testIsValid()).toBe(false);
  user.lastname = "smith";
});

test("Test validité user false car pas de pseudo", () => {
  user.pseudo = null;
  expect(user.testIsValid()).toBe(false);
  user.pseudo = "jsmith";
});

test("Test validité user false car pseudo vide", () => {
  user.pseudo = "";
  expect(user.testIsValid()).toBe(false);
  user.pseudo = "jsmith";
});

test("Test validité user false car pas d'image", () => {
  user.image = null;
  expect(user.testIsValid()).toBe(false);
  user.image = "https://image.fr"
});

test("Test validité user false car image vide", () => {
  user.image = "";
  expect(user.testIsValid()).toBe(false);
  user.image = "https://image.fr"
});


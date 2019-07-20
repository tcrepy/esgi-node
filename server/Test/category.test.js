const Category = require("../Models/CategorySchema");

/* Category */
let category = new Category({
  title: "PHP",
  description: "Documentation PHP",
  color: "FFFFFF"
});

test("Test validité category true", () => {
  expect(category.testIsValid()).toBe(true);
});

test("Test validité category false car pas de titre", () => {
  category.title = null;
  expect(category.testIsValid()).toBe(false);
  category.title = "PHP";
});

test("Test validité category false car titre vide", () => {
  category.title = "";
  expect(category.testIsValid()).toBe(false);
  category.title = "PHP";
});

test("Test validité category false car pas de description", () => {
  category.description = null;
  expect(category.testIsValid()).toBe(false);
  category.description = "Documentation PHP";
});

test("Test validité category false car description vide", () => {
  category.description = "";
  expect(category.testIsValid()).toBe(false);
  category.description = "Documentation PHP";
});

test("Test validité category false car couleur non hexadecimal", () => {
  category.color = "HHHHHH";
  expect(category.testIsValid()).toBe(false);
  category.color = "FFFFFF";
});

test("Test validité category false car couleur non hexadecimal", () => {
  category.color = "FFFFFFFF";
  expect(category.testIsValid()).toBe(false);
  category.color = "FFFFFFFF";
});

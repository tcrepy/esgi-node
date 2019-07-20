const Post = require("../Models/PostSchema");

/* Category */
let post = new Post({
  title: "PHP",
  description: "Documentation PHP",
  link: "google.fr",
  user : {
    "pseudo" : "Mathias"
  },
  "categories": {
    "_id": "5d3384081c4662349d74deeee",
    "title": "JS",
    "color": "FFFFFF"
  },
  "upvote": 3
});

test("Test validité post true", () => {
  expect(post.testIsValid()).toBe(true);
});

test("Test validité post false car pas de titre", () => {
  post.title = null;
  expect(post.testIsValid()).toBe(false);
  post.title = "PHP";
});

test("Test validité post false car titre vide", () => {
  post.title = "";
  expect(post.testIsValid()).toBe(false);
  post.title = "PHP";
});

test("Test validité post false car pas de description", () => {
  post.description = null;
  expect(post.testIsValid()).toBe(false);
  post.description = "Documentation PHP";
});

test("Test validité post false car description vide", () => {
  post.description = "";
  expect(post.testIsValid()).toBe(false);
  post.description = "Documentation PHP";
});

test("Test validité post false car pas de lien", () => {
  post.link = null;
  expect(post.testIsValid()).toBe(false);
  post.link = "google.fr";
});

test("Test validité post false car lien vide", () => {
  post.link = "";
  expect(post.testIsValid()).toBe(false);
  post.link = "google.fr";
});

test("Test validité post false car pas de user", () => {
  post.user = null
  expect(post.testIsValid()).toBe(false);
  post.user = { pseudo : "Valentin" }
});

test("Test validité post false car pas user pas de nom", () => {
  post.user.pseudo = null
  expect(post.testIsValid()).toBe(false);
  post.user = {
    pseudo : "Valentin"
  }
});

test("Test validité categories false car pas de categories", () => {
  post.categories = null;
  expect(post.testIsValid()).toBe(false);
  post.categories = {
    title: "PHP",
    color: "FFFFFF"
  }
});

test("Test validité categories false car couleur non hexadecimal", () => {
  post.categories.color = "HHHHHH";
  expect(post.testIsValid()).toBe(false);
  post.categories.color = "FFFFFF";
});

test("Test validité categories false car couleur non hexadecimal", () => {
  post.categories.color = "FFFFFFFF";
  expect(post.testIsValid()).toBe(false);
  post.categories.color = "FFFFFFFF";
});

test("Test validité post false car pas de prix", () => {
  post.upvote = null;
  expect(post.testIsValid()).toBe(false);
  post.upvote = 10;
});

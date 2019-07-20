const Tuto = require("../Models/TutoSchema");

/* Tuto */
let tuto = new Tuto({
  title: "Faire un jeu avec Unity",
  price: 100,
  videos: ["video1", "video2"],
  category : {
    title: "Unity",
    color: "FFFFFF"
  },
  teacher: {
    pseudo : "Valentin"
  },
  rates: [{
    user : "Michael",
    stars : 5,
    comment : "great !"
  },
  {
    user : "Julien",
    stars : 4,
    comment : ''
  },
  {
    user : "Jack",
    stars : 1,
    comment : 'nul'
  }]
});

test("Test validité tuto true", () => {
  expect(tuto.testIsValid()).toBe(true);
});

test("Test validité tuto false car pas de titre", () => {
  tuto.title = null;
  expect(tuto.testIsValid()).toBe(false);
  tuto.title = "Faire un jeu avec Unity";
});

test("Test validité tuto false car titre vide", () => {
  tuto.title = "";
  expect(tuto.testIsValid()).toBe(false);
  tuto.title = "Faire un jeu avec Unity";
});

test("Test validité tuto false car pas de prix", () => {
  tuto.price = null;
  expect(tuto.testIsValid()).toBe(false);
  tuto.price = 100;
});

test("Test validité tuto false car vidéos pas bonnes", () => {
  tuto.videos = null;
  expect(tuto.testIsValid()).toBe(false);
  tuto.videos = ["video1", "video2"]
});

test("Test validité tuto false car vidéos pas bonnes", () => {
  tuto.videos = []
  expect(tuto.testIsValid()).toBe(false);
  tuto.videos = ["video1", "video2"]
});

test("Test validité tuto false car pas de prof", () => {
  tuto.teacher = null
  expect(tuto.testIsValid()).toBe(false);
  tuto.teacher = { pseudo : "Valentin" }
});

test("Test validité tuto false car pas prof pas de nom", () => {
  tuto.teacher.pseudo = null
  expect(tuto.testIsValid()).toBe(false);
  tuto.teacher = {
    pseudo : "Valentin"
  }
});

test("Test validité category false car pas de category", () => {
  tuto.category = null;
  expect(tuto.testIsValid()).toBe(false);
  tuto.category = {
    title: "Unity",
    color: "FFFFFF"
  }
});

test("Test validité category false car couleur non hexadecimal", () => {
  tuto.category.color = "HHHHHH";
  expect(tuto.testIsValid()).toBe(false);
  tuto.category.color = "FFFFFF";
});

test("Test validité category false car couleur non hexadecimal", () => {
  tuto.category.color = "FFFFFFFF";
  expect(tuto.testIsValid()).toBe(false);
  tuto.category.color = "FFFFFFFF";
});

test("Test validité category false car on essaye d'ajouter un avis sans commentaire", () => {
  expect(tuto.addRate({ stars : 0 })).toBe(false);
});

test("Test validité category false car avis sans commentaire", () => {
  tuto.rates = [{
      user : "Michael",
      stars : 0,
      comment : ""
    }]
  expect(tuto.testIsValid()).toBe(false);
  tuto.rates = []
});

test("Test validité category false car avis avec trop d'étoiles", () => {
  tuto.rates = [{
      user : "Michael",
      stars : 8,
      comment : ""
    }]
  expect(tuto.testIsValid()).toBe(false);
  tuto.rates = []
});

test("Test validité category false car avis négatif", () => {
  tuto.rates = [{
      user : "Michael",
      stars : -8,
      comment : ""
    }]
  expect(tuto.testIsValid()).toBe(false);
  tuto.rates = []
});

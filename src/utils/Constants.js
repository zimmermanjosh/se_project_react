export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const weatherOptions = [
  {
    url: require("../images/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../images/day/fog.svg").default,
    day: true,
    type: "fog",
  },
  {
    url: require("../images/day/rain.svg").default,
    day: true,
    type: "rain",
  },
  {
    url: require("../images/day/snow.svg").default,
    day: true,
    type: "snow",
  },
  {
    url: require("../images/day/storm.svg").default,
    day: true,
    type: "storm",
  },
  {
    url: require("../images/day/sunny.svg").default,
    day: true,
    type: "sunny",
  },
  //night options
  {
    url: require("../images/night/clear_sunny.svg").default,
    day: false,
    type: "clear_sunny",
  },
  {
    url: require("../images/night/cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../images/night/fog.svg").default,
    day: false,
    type: "fog",
  },
  {
    url: require("../images/night/rain.svg").default,
    day: false,
    type: "rain",
  },
  {
    url: require("../images/night/snow.svg").default,
    day: false,
    type: "snow",
  },
  {
    url: require("../images/night/storm.svg").default,
    day: false,
    type: "storm",
  },
];

export const tempCompareValues = {
  hot: 70,
  warm: 66,
  cold: 55,
};

export const weatherAPIData = {
  latitude: 32.779167,
  longitude: -96.80889,
  APIkey: "9ed2af8b44ccce6e0959621de59c2764",
};

export const userNameProfile = "Joshua Zimmerman";

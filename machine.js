const DecisionTree = require('decision-tree');
var training_data = [
    {"cropname": "Aubergine",
    "mintemp": "9",
    "optmintemp": "20",
    "optmaxtemp": "35",
    "maxtemp": "40",
    "minrain": "800",
    "optminrain": "1200",
    "optmaxrain": "1600",
    "maxrain": "4000",
    "minph": "4.3",
    "optminph": "5.5",
    "optmaxph": "6.8",
    "maxph": "8.5"
    },
    {
    "cropname": "Black Pepper",
    "mintemp": "10",
    "optmintemp": "22",
    "optmaxtemp": "35",
    "maxtemp": "40",
    "minrain": "2000",
    "optminrain": "2500",
    "optmaxrain": "4000",
    "maxrain": "5500",
    "minph": "5",
    "optminph": "6",
    "optmaxph": "7",
    "maxph": "7.5"
    },
    {
    "cropname": "Broccoli",
    "mintemp": "3",
    "optmintemp": "15",
    "optmaxtemp": "24",
    "maxtemp": "35",
    "minrain": "350",
    "optminrain": "900",
    "optmaxrain": "1500",
    "maxrain": "2000",
    "minph": "5.5",
    "optminph": "6",
    "optmaxph": "6.8",
    "maxph": "8.5"
    },
    {
    "cropname": "Cauliflower",
    "mintemp": "5",
    "optmintemp": "10",
    "optmaxtemp": "25",
    "maxtemp": "30",
    "minrain": "450",
    "optminrain": "600",
    "optmaxrain": "1100",
    "maxrain": "1900",
    "minph": "5.5",
    "optminph": "6",
    "optmaxph": "7",
    "maxph": "8.5"
    },
    {
    "cropname": "Coriander",
    "mintemp": "4",
    "optmintemp": "15",
    "optmaxtemp": "25",
    "maxtemp": "32",
    "minrain": "300",
    "optminrain": "500",
    "optmaxrain": "1400",
    "maxrain": "2600",
    "minph": "4",
    "optminph": "5.5",
    "optmaxph": "7.5",
    "maxph": "8"
    },
    {
    "cropname": "Corn",
    "mintemp": "10",
    "optmintemp": "18",
    "optmaxtemp": "33",
    "maxtemp": "47",
    "minrain": "400",
    "optminrain": "600",
    "optmaxrain": "1200",
    "maxrain": "1800",
    "minph": "4.5",
    "optminph": "5",
    "optmaxph": "7",
    "maxph": "8.5"
    },
    {
    "cropname": "Onion",
    "mintemp": "4",
    "optmintemp": "12",
    "optmaxtemp": "25",
    "maxtemp": "30",
    "minrain": "300",
    "optminrain": "350",
    "optmaxrain": "600",
    "maxrain": "2800",
    "minph": "4.3",
    "optminph": "6",
    "optmaxph": "7",
    "maxph": "8.3"
    },
    {
    "cropname": "Potato",
    "mintemp": "7",
    "optmintemp": "15",
    "optmaxtemp": "25",
    "maxtemp": "30",
    "minrain": "250",
    "optminrain": "500",
    "optmaxrain": "800",
    "maxrain": "2000",
    "minph": "4.2",
    "optminph": "5",
    "optmaxph": "6.2",
    "maxph": "8.5"
    },
    {
    "cropname": "Rice",
    "mintemp": "10",
    "optmintemp": "20",
    "optmaxtemp": "30",
    "maxtemp": "36",
    "minrain": "1000",
    "optminrain": "1500",
    "optmaxrain": "2000",
    "maxrain": "4000",
    "minph": "4.5",
    "optminph": "5.5",
    "optmaxph": "7",
    "maxph": "9"
    },
    {
    "cropname": "Spinach",
    "mintemp": "2",
    "optmintemp": "13",
    "optmaxtemp": "20",
    "maxtemp": "27",
    "minrain": "300",
    "optminrain": "800",
    "optmaxrain": "1200",
    "maxrain": "1700",
    "minph": "5.3",
    "optminph": "6",
    "optmaxph": "7.5",
    "maxph": "8.3"
    },
    {
    "cropname": "Tomato",
    "mintemp": "7",
    "optmintemp": "20",
    "optmaxtemp": "27",
    "maxtemp": "35",
    "minrain": "400",
    "optminrain": "600",
    "optmaxrain": "1300",
    "maxrain": "1800",
    "minph": "5",
    "optminph": "5.5",
    "optmaxph": "6.8",
    "maxph": "7.5"
    },
    {
    "cropname": "Wheat",
    "mintemp": "5",
    "optmintemp": "15",
    "optmaxtemp": "23",
    "maxtemp": "27",
    "minrain": "300",
    "optminrain": "750",
    "optmaxrain": "900",
    "maxrain": "1600",
    "minph": "5.5",
    "optminph": "6",
    "optmaxph": "7",
    "maxph": "8.5"
    }
  ];

exports.addTrainingData = function(dataArray) {
  trainingData.push(dataArray);
}

// TODO
exports.predictData = function(maxtemp,mintemp,maxrain,minrain,maxph,minph) {
  // Setup Target Class used for prediction:
  var class_name = "cropname";
  // Setup Features to be used by decision tree:
  var features = ["mintemp", "optmintemp", "optmaxtemp", "maxtemp","minrain","optminrain","optmaxrain","maxrain","minph","optminph","optmaxph","maxph"];

  // Create decision tree and train model:
  var dt = new DecisionTree(training_data, class_name, features);
  
  var predicted_class = dt.predict({
    // maxtemp:maxtemp,mintemp:mintemp,maxrain:maxrain,minrain:minrain,maxph:maxph,minph:minph
    maxtemp:42,mintemp:15,maxrain:1048.6,minrain:1048.6,maxph:6.8,minph:6.8
  });
  console.log(predicted_class)
  
  return predicted_class
}
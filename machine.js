exports.predictData = function() {
  var DecisionTree = require('decision-tree');
  
  var training_data = [
    {"color":"blue", "shape":"square", "liked":false},
    {"color":"red", "shape":"square", "liked":false},
    {"color":"blue", "shape":"circle", "liked":true},
    {"color":"red", "shape":"circle", "liked":true},
    {"color":"blue", "shape":"hexagon", "liked":false},
    {"color":"red", "shape":"hexagon", "liked":false},
    {"color":"yellow", "shape":"hexagon", "liked":true},
    {"color":"yellow", "shape":"circle", "liked":true}
  ];

  var test_data = [
    {"color":"blue", "shape":"hexagon", "liked":false},
    {"color":"red", "shape":"hexagon", "liked":false},
    {"color":"yellow", "shape":"hexagon", "liked":true},
    {"color":"yellow", "shape":"circle", "liked":true}
  ];
  // Setup Target Class used for prediction:
  var class_name = "liked";
  // Setup Features to be used by decision tree:
  var features = ["color", "shape"];

  // Create decision tree and train model:
  var dt = new DecisionTree(training_data, class_name, features);
  
  var predicted_class = dt.predict({
    color: "blue",
    shape: "hexagon"
  });
  console.log(predicted_class)

  var accuracy = dt.evaluate(test_data);
  console.log(accuracy)
  
  var result = dt
  return result
}
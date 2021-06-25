const get_top_features = (
  topFeaturesNumber,
  possibleFeatures,
  featureRequests
) => {
  //map the possible features into a list of [feature, featureCount]. all count initially starting at 0
  let possibleFeaturesWithCount = possibleFeatures.map((element) => [
    element,
    0,
  ]);

  featureRequests.forEach((featureRequestItem) => {
    //which possible features does this feature request fall into? Find it and increment the feature count.

    for (let index = 0; index < possibleFeaturesWithCount.length; index += 1) {
      let possibleFeatureWithCount = possibleFeaturesWithCount[index];

      //use basic string search (case insensitive) to check if feature request contains a possible featue keyword.
      let possibleFeatureKeyword = possibleFeatureWithCount[0];

      if (
        featureRequestItem
          .toLowerCase()
          .includes(possibleFeatureKeyword.toLowerCase())
      ) {
        possibleFeaturesWithCount[index][1]++;
      }
    }
  });

  possibleFeaturesWithCount.sort((first, second) => {
    return second[1] - first[1];
  });

  let sortedPossibleFeatures = possibleFeaturesWithCount.map(
    (element) => element[0]
  );

  return sortedPossibleFeatures.slice(0, topFeaturesNumber);
};

const possibleFeatures = [
  "storage",
  "battery",
  "hover",
  "alexa",
  "waterproof",
  "solar",
];
const featureRequests = [
  "I wish my Kindle had even more storage",
  "I wish the battery life on my Kindle lasted 2 years.",
  "I read in the bath and would enjoy a waterproof Kindle",
  "Waterproof and increased battery are my top two",
  "I want to take my Kindle into the shower. Waterproof please waterproof!",
  "I wanna make my Kindle hover on my desk",
];

console.log(get_top_features(3, possibleFeatures, featureRequests));

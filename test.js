const get_top_features = (
  topFeaturesNumber,
  possibleFeatures,
  featureRequests
) => {
  const totalObj = [];
  const counter = [];

  //split the featurerequets and convert the featureRequests to individual Array
  featureRequests.forEach((element) => {
    let araayItems = element.split(" ");
    araayItems.forEach((element) => {
      counter.push(element);
    });
  });

  counter.forEach((lst) => {
    possibleFeatures.forEach((pf) => {
      if (lst == pf) {
        totalObj.push({ lst });
      }
    });
  });

  return totalObj;
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
  "How about a solar Kindle!",
];

console.log(get_top_features(3, possibleFeatures, featureRequests));

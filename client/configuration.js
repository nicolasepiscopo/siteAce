/////
// accounts plugin configuration
////
Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});

/////
// flash messages configuration
/////
FlashMessages.configure({
  autoHide: true,
  hideDelay: 5000,
  autoScroll: true
});

// Site configuration
Session.set("topSitesQuantity", 5);
Session.set("numberOfRecommendations", 5);

// Suscribe
Meteor.subscribe("websites");
Meteor.subscribe("comments");
Meteor.subscribe("recommendations");
Meteor.subscribe("votes");

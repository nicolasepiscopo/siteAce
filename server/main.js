Meteor.methods({
  "requestUrlData" : function(url){
    this.unblock();
    return HTTP.get(url);
  },
  "requestRecommendations" : function(userId, numberOfRecommendations){
    return recEngine.suggest(Meteor.user()._id, numberOfRecommendations, function(error, result) {
      //Remove old recommendations -> here could be a cache system
      Recommendations.remove({"user" : userId});
      //return result;
      result.forEach(function(element){
        Recommendations.insert({"site":Websites.findOne({_id:element.suggestion}), "user" : userId});
      });   
    });
  },
  "addRecommendation" : function(userId, websiteId){
    recEngine.link(userId, websiteId);
  }
});

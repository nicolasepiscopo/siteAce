// helper function that returns all available websites
Template.sites.helpers({
  searchQuery: Session.get('searchQuery'),
	websites:function(){
		return Websites.find({}, {"sort":{"votesUp":-1, "votesDown":-1}});
	}
});

Template.topRatedSites.helpers({
  "sites" : function(){
    return Websites.find({}, {"sort":{"votesUp":-1, "votesDown":-1}, "limit":Session.get("topSitesQuantity") })
  }
});

Template.lastAddedSites.helpers({
  "sites" : function(){
    return Websites.find({}, {"sort":{"createdOn":-1}, "limit":Session.get("topSitesQuantity") })
  }
});

Template.siteDetail.helpers({
  getUsername : function(id){
    var user = Meteor.users.findOne({_id:id});
    if(user){
      return user.username;
    }
    return "anonymous";
  }
});

Template.siteForm.helpers({
  title : Session.get("formTitle"),
  description : Session.get("formDescription")
});

//Recommendations
Template.recommendations.helpers({
  sites : function(){
    //Get last vote from this user
    var votes = Votes.find({
      "createdBy" : Meteor.user()._id
    });

    var recommendations = [];

    if(votes){

      var foundKeywords = [];
      votes.forEach(function(vote){
        var keywords;
        if(keywords=Websites.findOne({_id:vote.website}).keywords)
          foundKeywords.merge(keywords);
      });
      
      Websites.find({keywords : {$in: foundKeywords}},{"limit" : Session.get('numberOfRecommendations')}).forEach(function(r){
        var voted = Votes.findOne({"createdBy":Meteor.user()._id, "website": r._id});
        if(!voted)
          recommendations.push(r);
      });
    }
    
    return recommendations;
  }
});

//Easysearch package
Template.searchBox.helpers({
  websitesIndex: () => WebsitesIndex
});

//Global helpers
Template.registerHelper('cleanId', function(id) {
    var cleanId = id.substring(0,17); //same as truncate.
    return new Spacebars.SafeString(cleanId)
});

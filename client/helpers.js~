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
    console.log(user);
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
    var sites = [];
    Recommendations.find({"user":Meteor.user()._id}).forEach(function(recommendation){
      sites.push(recommendation.site);
    });
    return sites;
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

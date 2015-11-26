// helper function that returns all available websites
Template.sites.helpers({
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

Template.searchBox.helpers({
  websitesIndex: () => WebsitesIndex // instanceof EasySearch.Index
});
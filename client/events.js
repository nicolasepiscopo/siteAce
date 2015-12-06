Template.site.events({
	"click .js-upvote":function(event){
		if(Meteor.user()){
		  var websiteId = this._id;
		
		  var vote = {
		    number : 1,
		    website : websiteId,
	      	createdOn : new Date(),
	      	createdBy : Meteor.user()._id
		  };
		  
		  if(!Votes.findOne({createdBy:vote.createdBy, website:vote.website, number:vote.number})){
	      	if(Votes.insert(vote)){
	        	//update votes     
          		Websites.update(vote.website, { $inc : {votesUp : 1 } });
        	}
	      }else{
	        FlashMessages.sendWarning("You just voted that site before.");
	      }
	    }else{
	      FlashMessages.sendError("Sign in to do this.");
	    }
		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){
    if(Meteor.user()){
      var websiteId = this._id;
      
      console.log(websiteId);
		
      var vote = {
		    number : -1,
		    website : websiteId,
	      createdOn : new Date(),
	      createdBy : Meteor.user()._id
		  };		

		  if(!Votes.findOne({createdBy:vote.createdBy, website:vote.website, number:vote.number})){
	      if(Votes.insert(vote))
          Websites.update(vote.website, { $inc : {votesDown : -1 } });
      }else{
        FlashMessages.sendWarning("You just voted that site before.");
      }
    }else{
      FlashMessages.sendError("Sign in to do this.");
    }
		return false;// prevent the button from reloading the page
	}
});

Template.siteForm.events({
	"submit .js-save-website-form" : function(event){
    if(Meteor.user()){
		  var site = {
		    url : event.target.url.value,
		    title : event.target.title.value,
		    keywords : event.target.title.value.removeStopWords().split(" ").merge(event.target.description.value.removeStopWords().split(" ")),
		    description : event.target.description.value,
		    createdOn : new Date(),
		    createdBy : Meteor.user()._id
		  };
		
		  if(!Websites.findOne({url:site.url})){
		    if(Websites.insert(site)){
		      	FlashMessages.sendSuccess("Website added successfuly!");
	        	event.target.url.value = "";
	        	event.target.title.value = "";
	        	event.target.description.value = "";
	      	}
		  }else{
      		FlashMessages.sendError("This site is already shared");
		  }
		}else{
      FlashMessages.sendError("Sign in to do this.");
    }
		return false;// stop the form submit from reloading the page

	},
	"click .js-get-site-data" : function(event){
	  var url = $("#url").val();
	  $("#metaLoading").show();
	  extractMeta(url, function (err, res) { 
	  	$("#title").val(res.title);
	  	$("#description").val(res.description);
	  	$("#metaLoading").hide();
	  });
	}
});

Template.commentForm.events({
  "submit .js-save-comment-form" : function(event){
     if(Meteor.user()){
      var comment = {
	      content : event.target.content.value,
	      createdOn : new Date(),
	      createdBy : Meteor.user()._id,
	      site: this.site._id
	    };
	
      if(Comments.insert(comment)){
        FlashMessages.sendSuccess("Comment added successfuly!");
        event.target.content.value = "";
      }
	  }else{
      FlashMessages.sendError("Sign in to do this.");
    }
	  return false;// stop the form submit from reloading the page
  }
});

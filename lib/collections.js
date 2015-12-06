//Collections
Websites = new Mongo.Collection("websites");
Votes = new Mongo.Collection("votes");
Comments = new Mongo.Collection("comments");

//Security
Websites.allow({
  insert : function(userId, doc){
    if (Meteor.user()){
      return true;
    }
    return false;
  },
  remove : function(userId, doc){
    if (Meteor.user()){
      if(userId==doc.createdBy){
        return true;
      }
    }
    return false;
  },
  update : function(userId, doc){
    if (Meteor.user()){
      return true;
    }
    return false;
  }
});

Votes.allow({
  insert : function(userId, doc){
    if (Meteor.user()){
      return true;
    }
    return false;
  },
  remove : function(userId, doc){
    return false;
  },
  update : function(userId, doc){
    return false;
  }
});

Comments.allow({
  insert : function(userId, doc){
    if (Meteor.user()){
      return true;
    }
    return false;
  },
  remove : function(userId, doc){
    return false;
  },
  update : function(userId, doc){
    return false;
  }
});

//Easysearch package
WebsitesIndex = new EasySearch.Index({
  collection: Websites,
  fields: ['title','url','description'],
  engine: new EasySearch.MongoDB()
});

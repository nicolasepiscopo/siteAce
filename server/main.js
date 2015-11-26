Meteor.methods({
  "requestUrlData" : function(url){
    this.unblock();
    return HTTP.get(url);
  }
});

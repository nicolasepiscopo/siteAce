Websites = new Mongo.Collection("websites");
Votes = new Mongo.Collection("votes");
Comments = new Mongo.Collection("comments");
Recommendations = new Mongo.Collection("recommendations");

//Easysearch package
WebsitesIndex = new EasySearch.Index({
  collection: Websites,
  fields: ['title','url','description'],
  engine: new EasySearch.MongoDB()
});
// Do not forgive to remove insecure package from meteor and set permissions

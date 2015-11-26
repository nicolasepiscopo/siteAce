Websites = new Mongo.Collection("websites");
Votes = new Mongo.Collection("votes");
Comments = new Mongo.Collection("comments");

WebsitesIndex = new EasySearch.Index({
  collection: Websites,
  fields: ['url', 'title', 'description'],
  engine: new EasySearch.Minimongo()
});

// Do not forgive to remove insecure package from meteor and set permissions

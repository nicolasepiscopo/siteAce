Router.configure({
  layoutTemplate : 'layout'
});

Router.route('/', function () {
  this.render('welcome', {
    to : "main"
  });
  this.render('navbar', {
    to : "navbar"
  });
});

Router.route('/sites', function () {
  this.render('sites', {
    to : "main"
  });
  this.render('navbar', {
    to : "navbar"
  });
});

Router.route('/search', function () {
  this.render('searchBox', {
    to : "main"
  });
  this.render('navbar', {
    to : "navbar"
  });
});

Router.route('/post', function () {
  this.render('siteForm', {
    to : "main"
  });
  this.render('navbar', {
    to : "navbar"
  });
});

Router.route('/site/:_id', function (id) {
  this.render('siteDetail', {
    to : "main",
    data : {
      site : Websites.findOne({_id:this.params._id}),
      comments : Comments.find({site:this.params._id},{"sort":{"createdOn":1}})
    }
  });
  this.render('navbar', {
    to : "navbar"
  });
});

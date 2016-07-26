import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Session} from 'meteor/session';
import { Images } from './../../both/images.js';
import '../main.html';


Session.setDefault('counter', 0);


/*
*USERNAME_ONLY
*USERNAME_AND_EMAIL
*USERNAME_AND_OPTIONAL_EMAIL
*EMAIL_ONLY (default)
*/
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

Template.body.helpers({
  username:function(){
    if(Meteor.user()){
      return Meteor.user().username;
    }else{
      return 'Guess User';
    }
  }
})


Template.routeexample.helpers({
  counter() {
    //return Template.instance().counter.get();
    return Session.get('counter');
  },
});


Template.thing1.helpers({images:Images.find({}, {sort:{createdAt:-1,rating:-1}})});

Template.routeexample.events({
  'click button': function() {
    // increment the counter when button is clicked
  	Session.set('counter', Session.get('counter') + 1);
  	Router.current().route.path() == "/" ? Router.go('/second') : Router.go('/');

  },
});

Template.thing1.events({
  'click .js-image': function(event){
    $(event.target).css('width', '50px');
  },

  'click .js-image-delete': function(event){
      var img_id = this._id;
      console.log(img_id);

      $('#'+img_id).hide('slow', function(){
        Images.remove({"_id":img_id});
      });
  },

  'click .js-rate-image': function(event){
      var rating_count = $(event.currentTarget).data('userrating');
      console.log(rating_count);
      if(typeof this.rating == "undefined" || this.rating == 0){
        var curRate = 0;
        var rating = rating_count;
      }else{
        var curRate = this.rating;
        var rating = parseFloat((curRate + rating_count)/2);
      }
      var img_id = this.id;


      Images.update({_id: img_id}, 
                  {$set : {rating: rating }});
  },

  'click .js-show-modal-image': function(event){
      $('#image_add_form').modal('show');
  }


});

Template.image_add_form.created = function() {
  Uploader.init(this);
}

Template.image_add_form.rendered = function () {
  Uploader.render.call(this);
};

Template.image_add_form.helpers({
  'infoLabel': function() {
    var instance = Template.instance();

    // we may have not yet selected a file
    var info = instance.info.get()
    if (!info) {
      return;
    }

    var progress = instance.globalInfo.get();

    // we display different result when running or not
    return progress.running ?
      info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' :
      info.name + ' - ' + info.size + 'B';
  },
  'progress': function() {
    return Template.instance().globalInfo.get().progress + '%';
  }
})

Template.image_add_form.events({
  'submit .js-form-addimg': function(event){
    Uploader.startUpload.call(Template.instance(),event);
    var img_src, img_alt;
    img_src = Template.instance().info.get().name;
    img_alt = event.target.img_alt.value;
    Images.insert(
      {
        img_src:img_src, 
        img_alt:img_alt,
        createdAt: new Date()
      }
    );    
    $('#image_add_form').modal('show');
    return false;
  }

});


Meteor.startup(function(){
  Tracker.autorun(function(){
    Meteor.subscribe('images')
  });
});

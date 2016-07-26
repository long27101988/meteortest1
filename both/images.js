import { Meteor } from 'meteor/meteor';

export const Images = new Mongo.Collection('images');


Images.allow({
  insert: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  }
});

if (Meteor.isServer) {
	if(Images.find().count() == 0){
		console.log('not data');
		Images.insert(
		{
	    	img_src: "large.jpg",
	    	img_alt: "this is my baby"
		},
		);
		Images.insert(
		{
			img_src: "boy.jpg",
	    	img_alt: "this is my boy"
		});
		Images.insert(
		{
			img_src: "girl.jpg",
	    	img_alt: "this is my girl"
		}
		);
		console.log(Images.find());
	}

	Meteor.publish('images', function(){
		return Images.find({});
	});
}
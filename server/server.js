import { Meteor } from 'meteor/meteor';
import { Images } from './../both/images.js';
 	
Meteor.startup(() => {
	UploadServer.init({
	    tmpDir: './testmeteor/chatapp/public/tmp',
	    uploadDir: './testmeteor/chatapp/public/',
	    checkCreateDirectories: false,
	    getDirectory: function(fileInfo, formData) {
	      if (formData && formData.directoryName != null) {
	        return formData.directoryName;
	      }
	      return "";
	    },
	    getFileName: function(fileInfo, formData) {
	      if (formData && formData.prefix != null) {
	        return formData.prefix + '_' + fileInfo.name;
	      }
	      return fileInfo.name;
	    } ,
	    finished: function(file, folder, formFields) {
	      console.log('Write to database: ' + folder + '/' + file);
	    }
  	});
});



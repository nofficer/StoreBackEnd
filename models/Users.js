var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const saltRounds = 10;

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
        } ,

    password: {
      type: String,
      required: true
        }
});

UserSchema.pre('save', function(next) {
	//Check if document is new or a new password has been set
	if (this.isNew || this.isModified('password')) {
		//saving reference to this because of changing scopes
		const document = this;
		bcrypt.hash(document.password, saltRounds,
			function(err, hashedPassword) {
				if(err) {
					next(err);
				}
				else {
					document.password = hashedPassword;
					next()
				}
			});
	} else {
		next();
	}
});

UserSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

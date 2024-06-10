
class User{
    
    constructor(id, firstname, lastname, email, pwd, contactmoov, contacttg, create_time){
            this.userID = id;
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.pwd = pwd;
            this.contactmoov = contactmoov;
            this.contacttg = contacttg;
            this.create_time = create_time;
    }


    toJson(){
        return {
            "id": this.userID,
            "firstname": this.firstname,
            "lastname": this.lastname,
            "email" : this.email,
            "pwd" : this.pwd,
            "contactmoov" : this.contactmoov,
            "contacttg" : this.contacttg,
            "create_time" : this.create_time

        }
    }

    static jsonToNewUser (user) {
        const  newUser = new User(
            user.id,
            user.firstname,
            user.lastname,
            user.email,
            user.pwd,
            user.contactmoov,
            user.contacttg,
            user.create_time

            );
        return newUser;
    }
}

module.exports = {User}
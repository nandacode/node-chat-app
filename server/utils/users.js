// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }

// var me = new Person('Nanda', 28);
// console.log(me.getUserDescription());

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        var userToBeRemoved = this.getUser(id);
        this.users = this.users.filter((user) => user.id !== id);
        return userToBeRemoved;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var userNames = users.map(user => user.name);
        return userNames;
    }
}

module.exports = {Users};
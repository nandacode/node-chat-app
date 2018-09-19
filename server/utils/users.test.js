const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
                id: '1',
                name: 'Nanda',
                room: 'Node course'
            },{
                id: '2',
                name: 'Ranjith',
                room: 'React course'
            },{
                id: '3',
                name: 'Siva',
                room: 'Node course'
            }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Nanda',
            age: 28
        };
        var resUser = users.addUser(user.id, user.name, user.age);
        expect(users.users).toEqual([resUser]);
    });

    it('should remove user', () => {
        var user = users.removeUser('1');
        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var user = users.removeUser('1131');
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var resUser = users.getUser('1');
        expect(resUser.id).toBe('1');
    });

    it('should not find user', () => {
        var resUser = users.getUser('1213');
        console.log(resUser);
        expect(resUser).toBeFalsy();
    });

    it('should return user list', () => {
        var userList = users.getUserList('Node course');
        expect(userList).toEqual(['Nanda', 'Siva']);
    });
});
export class AuthService {

    constructor() {
        this.delay = 100;
        this.currentUser = null;
        this.users = [
            {username: 'Adi', password: '123'},
            {username: 'Aditya', password: '123'}
        ];
    }

    login(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let userExists = this.users.find(user1 => user.username === user1.username && user.password === user1.password);
                if (userExists !== undefined) {
                    this.currentUser = user;
                    resolve({user});
                } else {
                    reject(new Error('Invalid credentials.'));
                }
            }, this.delay);
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.currentUser = null;
                if (this.currentUser) {
                    reject(new Error('Error logging out.'));
                } else {
                    resolve({success: true});
                }
            }, this.delay);
        });
    }

    signup(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let userExists = this.users.find(user1 => user.username === user1.username);
                if (userExists === undefined) {
                    this.users.push(user);
                    this.currentUser = user;
                    resolve({user});
                } else {
                    reject(new Error('This user already exists.'));
                }
            }, this.delay);
        });
    }

}

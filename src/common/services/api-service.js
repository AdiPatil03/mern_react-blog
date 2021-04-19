/* eslint-disable */
export default class APIServices {

    constructor() {
    }

    allArticlesPreviews() {
        return new Promise((resolve, reject) => {
            fetch('/api/all-articles')
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => resolve({...data}));
                } else {
                    response.json().then(error => reject({message: error.message}));
                }
            }).catch(error => reject({message: error.message}));
        });
	}

	// allArchives() {
	// 	return new Promise((resolve, reject) => {
    //         fetch('/api/all-archives')
    //         .then(response => {
    //             if (response.status === 200) {
    //                 response.json().then(data => resolve({data}));
    //             } else {
    //                 response.json().then(error => reject({message: error.message}));
    //             }
    //         }).catch(error => reject({message: error.message}));
	// 	});		
	// }

	// allTags() {
	// 	return new Promise((resolve, reject) => {
    //         fetch('/api/all-tags')
    //         .then(response => {
    //             if (response.status === 200) {
    //                 response.json().then(data => resolve({data}));
    //             } else {
    //                 response.json().then(error => reject({message: error.message}));
    //             }
    //         }).catch(error => reject({message: error.message}));
	// 	});		
	// }

    find(slug) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return new Promise((resolve, reject) => {
            fetch(`/api/article/${slug}`)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        let articleDate = new Date(data.createdAt);

                        data.createdAt = `${articleDate.getDate()} ${months[articleDate.getMonth()]}, ${articleDate.getFullYear()}`;
                        resolve({...data});
                    });
                } else {
                    response.json().then(error => reject({message: error.message}));
                }
            }).catch(error => reject({message: error.message}));
        });
    }

    articlesByTag(tag) {
        return new Promise((resolve, reject) => {
            fetch(`/api/tag/${tag}`)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => resolve([...data]));
                } else {
                    response.json().then(error => reject({message: error.message}));
                }
            }).catch(error => reject({message: error.message}));
        });
    }

    articlesByArchive(archive) {
        return new Promise((resolve, reject) => {
            fetch(`/api/archive/${archive}`)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => resolve([...data]));
                } else {
                    response.json().then(error => reject({message: error.message}));
                }
            }).catch(error => reject({message: error.message}));
        });
    }

	create(article) {
		return new Promise((resolve, reject) => {
            fetch('/api/new-article', {
                method:  'post',
                body:    JSON.stringify(article),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => resolve({...data}));
                } else {
                    response.json.then(error => reject({message: error.message}));
                }
            }).catch(error => reject({message: error.message}));
		});	
	}

    update(article) {
        return new Promise((resolve, reject) => {
            fetch(`/api/update-article/${article.slug}`, {
                method:  'post',
                body:    JSON.stringify(article),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => resolve({...data}));
                } else {
                    response.json.then(error => reject({message: error.message}));
                }
            }).catch(error => reject({message: error.message}));
        });
    }

	login(name) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
				if (this.users.includes(name)) {
					this.currentUser = name;
					resolve({ user: name });
				} else {
					reject(new Error('Invalid credentials.'));
				}
		  }, this.delay);
		});
	}

	signup(name) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
				if (!this.users.includes(name)) {
					this.users.push(name);
					this.currentUser = name;
					resolve({ user: name });
				} else {
					reject(new Error('This user already exists.'));
				}
		  }, this.delay);
		});		
	}
}

class Borrow {
	static bookExist (bookId) {
		findById(bookId).then((exist) => {
			if (exist && exist.quantity !== 0) {
				console.log('true');
				return true;
			}
		});
	}
	static checkMember (member) {
		if (member === 'platinum') {
			return 2;
		}else if (member === 'gold') {
			return 4;
		}else {
			return 6;
		}
	}
	static hasHistory (user) {
		findById(userId).then((err, user) => {
			if (err) {
				return false;
			} else {
				return user;
			}
		}) 
	}
}
const borrow = new Borrow();
export default borrow;
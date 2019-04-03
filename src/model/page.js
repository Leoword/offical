const Page = exports.Page = class Page {
	constructor(name, sectionList) {
		this.hash = 
		this.name = name;
		this.sectionList = sectionList;
	}

	update({name, sectionList}) {
		this.name = name;
		this.sectionList = sectionList;
	}
}

exports.register = {
	list: [],
	init() {

	},
	create() {

	},
	findAll() {

	},
	findByPK() {

	},
	destroy(page) {
		
	}
}
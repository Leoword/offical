const {Base, Interface} = require('@or-change/content');

const base = module.exports = {
	Content: null,
	setBackend(backend) {
		const interface = new Interface(backend);
	
		base.Content = new Base(interface, {
			defaultLang: 'zh'
		});
	}
};
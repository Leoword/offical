module.exports = function ({pages}) {
	const routes = [];

	pages.forEach(page => {
		routes.push({
			name: page.name,
			path: `${page.path}?sectionList=${page.sectionList}`,
			component: 'pages/index.vue'
		}, {
			name: `lang-${page.name}`,
			path: `/_lang/${page.path}?sectionList=${page.sectionList}`,
			component: 'pages/_lang/index.vue'
		});
	});
}; 
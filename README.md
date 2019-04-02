# offical

article

attribute {
	title: string,
	language: string,
	abstract: string,
	cotent: string
}

post: /article
get: /article
get: /article/:articleId
put: /article
delete: /article/:articleId

category

attribute: {
	name: strirng,
	comment: string
}

post: /category
get: /category
get: /category/:categoryHash
put: /category
delete: /category/:categoryHash


section

attribute: {
	formatId: int,
	collection: string (JSON格式)，
	comment: string
}

post: /section
get: /section
get: /section/:sectionId
put: /section
delete: /section/:sectionId

format

attribute: {
	name: string,
	comment: string
}

post: /format
get: /format
get: /format/:formatId
put: /format
delete: /format/:formatId

file

attribute: {
	file: blob
}

post: /file
get: /file
get: /file/:hash
delete: /file/:hash


get: /section/:sectionId/article;
post: /article/:articleHash/category/:categoryHash
delete: /article/:articleHash/category/:categoryHash

get: /article/:articleHash/category
get: /category/:categoryHash/article



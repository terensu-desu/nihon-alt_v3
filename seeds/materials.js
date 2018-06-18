const mongoose = require("mongoose");
const Material = require("../models/Material");

const db = require("../config/keys").mongoURI;
mongoose
	.connect(db)
	.then(() => console.log("[SEEDER CONNECTED  TO DB]"))
	.catch(err => console.log("[ERROR WITH DATABASE]", err));

const materials = [
	new Material({
		title: "Test Activity - The First",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear1",
		unit: "unit2",
		part: "part1",
		keywords: "game, fun, battleship, basic, greeting",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "T2 - Test Title 2",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear1",
		unit: "unit2",
		part: "part1",
		keywords: "",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "Guess Who - Japanese Celebrities",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear1",
		unit: "unit2",
		part: "part1",
		keywords: "celebrities, famous, guess who, stuff",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "Voight-Kampff - Asking Questions",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear1",
		unit: "unit2",
		part: "part1",
		keywords: "",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "Queen to Bishop 6 - Check",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear2",
		unit: "unit4",
		part: "part3",
		keywords: "shoes, clothes, hats, rock, paper, scissors",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "Bingo Game - Being Polite",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear2",
		unit: "unit4",
		part: "part3",
		keywords: "bears, beets, battlestar galactica",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "Spelling Race of Some Kind",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear2",
		unit: "unit4",
		part: "part3",
		keywords: "spelling, burp, Farz, heart",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "Blah Blah Blah - The Blahest",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear3",
		unit: "unit2",
		part: "part1",
		keywords: "",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "Go Go Go Go Go Go",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear3",
		unit: "unit2",
		part: "part1",
		keywords: "",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "Dum Dum Give Me Gum Gum",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "Unit 6",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear3",
		unit: "unit6",
		part: "part1",
		keywords: "",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "U Know Left Brain Need a Freak",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear3",
		unit: "unit6",
		part: "part2",
		keywords: "",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
	new Material({
		title: "Where Dat Waka Flame Talking Bout A LIGHTA",
		instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus quas, tenetur sequi! Architecto adipisci, voluptatem veritatis labore recusandae deserunt ipsam quae, dicta rerum ipsum accusantium eaque excepturi eveniet temporibus?",
		filePath: "uploads/2018-6-17-204-Terence-TerenceMangramResume.doc",
		user: "5aff880dd4ad2e5c402f6c90",
		grade: "jhsyear3",
		unit: "unit6",
		part: "part2",
		keywords: "",
		username: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm",
		verified: true
	}),
];

let done = 0;
for(let material of materials) {
	material.save()
		.then(result => {
			done++;
			if(done === materials.length) {
				exit();
			}
		});
}

const exit = () => {
	mongoose.disconnect();
}
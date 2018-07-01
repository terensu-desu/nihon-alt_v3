const mongoose = require("mongoose");
const Post = require("../models/Post");

const db = require("../config/keys").mongoURI;
mongoose
	.connect(db)
	.then(() => console.log("[SEEDER CONNECTED  TO DB]"))
	.catch(err => console.log("[ERROR WITH DATABASE]", err));

const blogs = [
	new Post({
		title: "How to be a Great Teacher 101",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perferendis, inventore illo illum obcaecati ab molestias ipsum odio commodi nemo deleniti voluptas distinctio, voluptatum, a vero ad, eveniet expedita quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi perferendis vitae ipsum incidunt quam nemo, totam molestias quas debitis omnis at in quae, voluptatum quo a vero. Porro, obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat deserunt vero nisi similique debitis quisquam esse facere aperiam cum aliquid, facilis officiis modi repellendus dolores quod numquam molestiae autem, quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui incidunt perspiciatis, totam ullam, soluta iste sit id voluptatibus expedita odit mollitia quidem amet quae voluptatum aliquam beatae rem minima dolorum.",
		user: "5aff880dd4ad2e5c402f6c90",
		name: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm"
	}),
	new Post({
		title: "Save Money and Live Happily In Japan",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perferendis, inventore illo illum obcaecati ab molestias ipsum odio commodi nemo deleniti voluptas distinctio, voluptatum, a vero ad, eveniet expedita quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi perferendis vitae ipsum incidunt quam nemo, totam molestias quas debitis omnis at in quae, voluptatum quo a vero. Porro, obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat deserunt vero nisi similique debitis quisquam esse facere aperiam cum aliquid, facilis officiis modi repellendus dolores quod numquam molestiae autem, quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui incidunt perspiciatis, totam ullam, soluta iste sit id voluptatibus expedita odit mollitia quidem amet quae voluptatum aliquam beatae rem minima dolorum.",
		user: "5aff880dd4ad2e5c402f6c90",
		name: "Sam Tarly",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm"
	}),
	new Post({
		title: "Gimme A Title Please Brain",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perferendis, inventore illo illum obcaecati ab molestias ipsum odio commodi nemo deleniti voluptas distinctio, voluptatum, a vero ad, eveniet expedita quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi perferendis vitae ipsum incidunt quam nemo, totam molestias quas debitis omnis at in quae, voluptatum quo a vero. Porro, obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat deserunt vero nisi similique debitis quisquam esse facere aperiam cum aliquid, facilis officiis modi repellendus dolores quod numquam molestiae autem, quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui incidunt perspiciatis, totam ullam, soluta iste sit id voluptatibus expedita odit mollitia quidem amet quae voluptatum aliquam beatae rem minima dolorum.",
		user: "5aff880dd4ad2e5c402f6c90",
		name: "Lord Snow",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm"
	}),
	new Post({
		title: "Work Work Work Work Work",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perferendis, inventore illo illum obcaecati ab molestias ipsum odio commodi nemo deleniti voluptas distinctio, voluptatum, a vero ad, eveniet expedita quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi perferendis vitae ipsum incidunt quam nemo, totam molestias quas debitis omnis at in quae, voluptatum quo a vero. Porro, obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat deserunt vero nisi similique debitis quisquam esse facere aperiam cum aliquid, facilis officiis modi repellendus dolores quod numquam molestiae autem, quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui incidunt perspiciatis, totam ullam, soluta iste sit id voluptatibus expedita odit mollitia quidem amet quae voluptatum aliquam beatae rem minima dolorum.",
		user: "5aff880dd4ad2e5c402f6c90",
		name: "Ree Anna",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm"
	}),
	new Post({
		title: "Monkeys Were Bamboozoled",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perferendis, inventore illo illum obcaecati ab molestias ipsum odio commodi nemo deleniti voluptas distinctio, voluptatum, a vero ad, eveniet expedita quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi perferendis vitae ipsum incidunt quam nemo, totam molestias quas debitis omnis at in quae, voluptatum quo a vero. Porro, obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat deserunt vero nisi similique debitis quisquam esse facere aperiam cum aliquid, facilis officiis modi repellendus dolores quod numquam molestiae autem, quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui incidunt perspiciatis, totam ullam, soluta iste sit id voluptatibus expedita odit mollitia quidem amet quae voluptatum aliquam beatae rem minima dolorum.",
		user: "5aff880dd4ad2e5c402f6c90",
		name: "Farz Ahm",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm"
	}),
	new Post({
		title: "How to be a Great Teacher 102",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perferendis, inventore illo illum obcaecati ab molestias ipsum odio commodi nemo deleniti voluptas distinctio, voluptatum, a vero ad, eveniet expedita quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi perferendis vitae ipsum incidunt quam nemo, totam molestias quas debitis omnis at in quae, voluptatum quo a vero. Porro, obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat deserunt vero nisi similique debitis quisquam esse facere aperiam cum aliquid, facilis officiis modi repellendus dolores quod numquam molestiae autem, quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui incidunt perspiciatis, totam ullam, soluta iste sit id voluptatibus expedita odit mollitia quidem amet quae voluptatum aliquam beatae rem minima dolorum.",
		user: "5aff880dd4ad2e5c402f6c90",
		name: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm"
	}),
	new Post({
		title: "How to be a Great Teacher 103",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perferendis, inventore illo illum obcaecati ab molestias ipsum odio commodi nemo deleniti voluptas distinctio, voluptatum, a vero ad, eveniet expedita quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi perferendis vitae ipsum incidunt quam nemo, totam molestias quas debitis omnis at in quae, voluptatum quo a vero. Porro, obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat deserunt vero nisi similique debitis quisquam esse facere aperiam cum aliquid, facilis officiis modi repellendus dolores quod numquam molestiae autem, quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui incidunt perspiciatis, totam ullam, soluta iste sit id voluptatibus expedita odit mollitia quidem amet quae voluptatum aliquam beatae rem minima dolorum.",
		user: "5aff880dd4ad2e5c402f6c90",
		name: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm"
	}),
	new Post({
		title: "How to be a Great Teacher 104",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perferendis, inventore illo illum obcaecati ab molestias ipsum odio commodi nemo deleniti voluptas distinctio, voluptatum, a vero ad, eveniet expedita quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi perferendis vitae ipsum incidunt quam nemo, totam molestias quas debitis omnis at in quae, voluptatum quo a vero. Porro, obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat deserunt vero nisi similique debitis quisquam esse facere aperiam cum aliquid, facilis officiis modi repellendus dolores quod numquam molestiae autem, quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui incidunt perspiciatis, totam ullam, soluta iste sit id voluptatibus expedita odit mollitia quidem amet quae voluptatum aliquam beatae rem minima dolorum.",
		user: "5aff880dd4ad2e5c402f6c90",
		name: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm"
	}),
	new Post({
		title: "How to be a Great Teacher 201",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perferendis, inventore illo illum obcaecati ab molestias ipsum odio commodi nemo deleniti voluptas distinctio, voluptatum, a vero ad, eveniet expedita quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi perferendis vitae ipsum incidunt quam nemo, totam molestias quas debitis omnis at in quae, voluptatum quo a vero. Porro, obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat deserunt vero nisi similique debitis quisquam esse facere aperiam cum aliquid, facilis officiis modi repellendus dolores quod numquam molestiae autem, quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui incidunt perspiciatis, totam ullam, soluta iste sit id voluptatibus expedita odit mollitia quidem amet quae voluptatum aliquam beatae rem minima dolorum.",
		user: "5aff880dd4ad2e5c402f6c90",
		name: "Terence Mangram",
		avatar: "www.gravatar.com/avatar/44d16bf42b0f0466272b2bb1f0d67d61?s=200&r=pg&d=mm"
	}),
];

let count = 0;
for(let blog of blogs) {
	blog.save()
		.then(res => {
			count++
			console.log("[Seed blog added!]", count)
		})
		.then(res => {
			mongoose.disconnect();
		});
}
const sample_movies = [
  {
    id: '1',
    name: 'Joker',
    stars: 3.9,
    favorite: true,
    imageUrl: 'assets/joker.jpeg',
    genre: ['Drama', 'Crime']
  },
  {
    id: '2',
    name: 'Prisoners',
    stars: 4.2,
    favorite: false,
    imageUrl: 'assets/prisoners.jpeg',
    genre: ['Crime', 'Drama', 'Thriller']
  },
  {
    id: '3',
    name: 'Seven',
    stars: 4.3,
    favorite: true,
    imageUrl: 'assets/seven.jpeg',
    genre: ['Crime', 'Thriller']
  },
  {
    id: '4',
    name: 'Shutter Island',
    stars: 4.1,
    favorite: false,
    imageUrl: 'assets/shutterisland.jpeg',
    genre: ['Mystery', 'Thriller']
  },
  {
    id: '5',
    name: 'The Social Network',
    stars: 4.0,
    favorite: false,
    imageUrl: 'assets/thesocialnetwork.jpeg',
    genre: ['Drama']
  }
]
const sample_tags = [
  { name: 'All', count: 5 },
  { name: 'Mystery', count: 1 },
  { name: 'Thriller', count: 3 },
  { name: 'Drama', count: 3 },
  { name: 'Crime', count: 2 }
]
const sample_users = [
  {
    name: "Gnanavel Premnath",
    email: "prem@gmail.com",
    password: "12345",
    address: "BC",
    isAdmin: true,
  },
  {
    name: "Shana Nursoo",
    email: "shana@gmail.com",
    password: "12345",
    address: "Surrey",
    isAdmin: false,
  },
];

module.exports = { sample_movies, sample_tags, sample_users };
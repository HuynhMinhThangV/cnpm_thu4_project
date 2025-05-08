const books = [
  {
    title: "The Great Adventure",
    description: "A thrilling journey through time and space.",
    genres: [{ name: "Sci-Fi" }, { name: "Adventure" }],
    author: "John Doe",
    images: [
      {
        path: "https://truyenfullmoi.com/cdn/medias/covers/1/1666-so-13-pho-mink_cover_large.jpg",
      },
    ],
    status: "Published",
    chapters: [
      {
        title: "Chapter 1: The Beginning",
        order: 1,
        comments: [
          {
            user: "Jone Doe",
            content: "asdasdsadadad",
          },
        ],
        content:
          "<h1>Welcome to the Adventure</h1><p>It all starts here...</p>",
      },
      {
        title: "Chapter 2: The Encounter",
        order: 2,
        content: "<h1>Meeting the Alien</h1><p>Unexpected twist!</p>",
      },
    ],
  },
  {
    title: "Mystery of the Lost City",
    description: "An archaeologist uncovers the secrets of an ancient city.",
    genres: [{ name: "Mystery" }, { name: "Historical" }],
    author: "Jane Smith",
    images: [
      {
        path: "https://truyenfullmoi.com/cdn/medias/covers/1/1587-lanh-dia_cover_large.jpg",
      },
    ],
    status: "Published",
    chapters: [
      {
        title: "Chapter 1: The Discovery",
        order: 1,
        comments: [
          {
            user: "Jone Doe",
            content: "asdasdsadadad",
          },
        ],
        content:
          "<h1>Finding the Hidden Map</h1><p>What will this lead to?</p>",
      },
      {
        title: "Chapter 2: The Journey Begins",
        order: 2,
        content: "<h1>On the Road</h1><p>The adventure begins...</p>",
      },
    ],
  },
  {
    title: "Programming 101",
    description: "A beginner's guide to learning programming.",
    genres: [{ name: "Education" }, { name: "Programming" }],
    author: "Michael Johnson",
    images: [
      {
        path: "https://truyenfullmoi.com/cdn/medias/covers/0/31-dao-tinh_cover_large.jpg",
      },
    ],
    status: "Published",
    chapters: [
      {
        title: "Chapter 1: Introduction to Programming",
        order: 1,
        comments: [
          {
            user: "Jone Doe",
            content: "asdasdsadadad",
          },
        ],
        content: "<h1>Getting Started</h1><p>What is programming?</p>",
      },
      {
        title: "Chapter 2: Your First Program",
        order: 2,
        content:
          "<h1>Hello, World!</h1><p>Writing your first line of code.</p>",
      },
    ],
  },
  {
    title: "The World of Magic",
    description: "A young wizard embarks on a magical journey.",
    genres: [{ name: "Fantasy" }, { name: "Adventure" }],
    author: "Lily Brown",
    images: [
      {
        path: "https://truyenfullmoi.com/cdn/medias/covers/0/45-de-ton_cover_large.jpg",
      },
    ],
    status: "Draft",
    chapters: [
      {
        comments: [
          {
            user: "Jone Doe",
            content: "asdasdsadadad",
          },
        ],
        title: "Chapter 1: A New Beginning",
        order: 1,
        content: "<h1>Magical Discovery</h1><p>The day everything changed.</p>",
      },
      {
        title: "Chapter 2: The School of Magic",
        order: 2,
        content: "<h1>Learning Magic</h1><p>Welcome to the academy!</p>",
      },
    ],
  },
  {
    title: "Cooking with Passion",
    description: "A collection of delicious recipes from around the world.",
    genres: [{ name: "Cookbook" }, { name: "Food" }],
    author: "Sophie Lee",
    images: [
      {
        path: "https://truyenfullmoi.com/cdn/medias/covers/0/63-di-the-ta-quan_cover_large.jpg",
      },
    ],
    status: "Published",
    chapters: [
      {
        title: "Chapter 1: Italian Cuisine",
        order: 1,
        comments: [
          {
            user: "Jone Doe",
            content: "asdasdsadadad",
          },
        ],
        content:
          "<h1>Classic Italian Dishes</h1><p>Pasta, pizza, and more!</p>",
      },
      {
        title: "Chapter 2: Desserts to Die For",
        order: 2,
        content:
          "<h1>Sweet Endings</h1><p>Learn how to make the perfect tiramisu!</p>",
      },
    ],
  },
];
export default books;

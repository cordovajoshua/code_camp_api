import mongoose from 'mongoose';
import Course from './models/courseModel.js';
import dotenv from 'dotenv';

dotenv.config();

const courses = [
  {
    language: 'HTML and CSS',
    name: 'Responsive Web Design',
    description:
      "In this Responsive Web Design Certification, you'll learn the languages that developers use to build webpages: HTML (Hypertext Markup Language) for content, and CSS (Cascading Style Sheets) for design.",
    about:
      "First, you'll build a cat photo app to learn the basics of HTML and CSS. Later, you'll learn modern techniques like CSS variables by building a penguin, and best practices for accessibility by building a quiz site. Finally, you'll learn how to make webpages that respond to different screen sizes by building a photo gallery with Flexbox, and a magazine article layout with CSS Grid.",
  },
  {
    language: 'JavaScript',
    name: 'Learn React',
    description:
      'In this React course, you’ll build powerful interactive applications with one of the most popular JavaScript libraries.',
    about:
      'You’ll learn how to start with React and build up to dynamic user interfaces. You’ll work with React specific concepts like: JSX, components, state, props, hooks, and more.',
  },
  {
    language: 'Python',
    name: 'Intro to Generative AI',
    description:
      'Dive into the many forms of generative AI and learn how we can best use these new technologies!',
    about:
      'Artificial Intelligence is a fast-evolving field of technology that lets computers simulate human functions, such as learning and problem-solving. A subset of AI that’s been gaining traction recently is generative AI, which specializes in creating new content, be it text, images, audio, or videos. Take this course to learn about the different types of generative AI using interactive applets!',
  },
  {
    language: 'JavaScript',
    name: 'JavaScript Algorithms and Data Structures',
    description:
      "While HTML and CSS control the content and styling of a page, JavaScript is used to make it interactive. In the JavaScript Algorithm and Data Structures Certification, you'll learn the fundamentals of JavaScript including variables, arrays, objects, loops, and functions.",
    about:
      "Once you have the fundamentals down, you'll apply that knowledge by creating algorithms to manipulate strings, factorialize numbers, and even calculate the orbit of the International Space Station. Along the way, you'll also learn two important programming styles or paradigms: Object Oriented Programming (OOP) and Functional Programming (FP).",
  },
  {
    language: 'C++',
    name: 'Learn C++',
    description:
      'Learn C++ — a versatile programming language that’s important for developing software, games, databases, and more.',
    about:
      'With its adaptability and fast rendering, you’ll find the C++ programming language used everywhere, from web browsers to game development and operating systems to science and machine learning tools. This course will help you learn C++ basics and give you hands-on experience to create your own projects and work with computer memory.',
  },
  {
    language: 'C++',
    name: 'Learn C++: References and Pointers',
    description:
      'References and pointers are some of the most powerful features in C++; they allow programmers to directly manipulate memory.',
    about:
      'Continue your C++ learning journey with Learn C++: References and Pointers. Learn about memory allocation and how to conserve it with references and pointers. Pass variables by reference and use pointers when references aren’t the most efficient choice.',
  },
  {
    language: 'SQL',
    name: 'Analyze Data with SQL',
    description:
      'Learn to analyze data with SQL and prepare for technical interviews. Includes SQL, Data Science, Command Line, SQLite, Databases, Queries, Tables, and more.',
    about:
      'All companies use data now, and most of it is stored in databases. In this Skill Path, you will use SQL queries to create databases, pull data from databases, and analyze the results. You will practice your skills with real-world marketing and user analysis case studies, and prepare for technical interviews. Interested in a career as a data analyst? This Skill Path is the perfect place to start.',
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected successfully');
    Course.insertMany(courses);
  })
  .catch((error) => console.log(`Error: ${error.message}`));

# Battleship Project

This project is a browser-based implementation of the classic Battleship game, developed using Test-Driven Development (TDD) to ensure reliable and maintainable code. The application is built around modular components—including ships, gameboards, and players—each responsible for specific pieces of game logic such as tracking hits, placing ships, handling attacks, and determining win conditions.

The project emphasizes writing unit tests with Jest before implementing functionality, focusing on testing core logic independently from the DOM. Players can engage in a turn-based game against a computer opponent, with interactions handled through event listeners and dynamically rendered gameboards. The computer player generates valid random moves, while the game manages turns, tracks hits and misses, and ends when all ships of a player are sunk.

Overall, this project demonstrates strong principles of TDD, separation of concerns, and interactive UI integration, providing a solid foundation for building complex, testable JavaScript applications.

Part of the [Odin Project](https://www.theodinproject.com) curriculum.

## Built With

- Jest
- Webpack

## Screenshots

<img width="1183" height="766" alt="Screenshot 2026-04-20 091636" src="https://github.com/user-attachments/assets/aecec198-8d06-4210-8c13-6b12c4b9cb21" />
<img width="1898" height="876" alt="Screenshot 2026-04-20 092058" src="https://github.com/user-attachments/assets/7778c0d4-a91e-479b-ac6b-1f53ae852146" />

## Challenges

One of the challenges was learning Jest. It was easy to read, but a little difficult to write myself. I wasn't sure how to test small
pieces at a time. I would write a whole game scenario to test if a hit function worked. It felt like I was repeating myself over and over. I felt there had to be a better way to write all of this. Even with the solution I have now, I am not sure if it is correct. However, a bigger challenge for me was staying organized. I kept getting lost between classes and how they were communicating with each other. The project quickly grew bigger. I think if I made this project again organization would be where I started. Not necessarily with writing the code, but even just writing out a plan on a piece of paper. Fully understanding the project and what it was asking of me.

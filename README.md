# NPB Language

The first programming language created by 0xNiWt.

NPB is a small programming language that compiles into JavaScript. The goal of the project is to create a self-hosted language with its own compiler and runtime.

> NPB is being developed for educational purposes.

![Version](https://img.shields.io/badge/version-0.0.2-blue)
![Status](https://img.shields.io/badge/status-in%20development-green)
![Language](https://img.shields.io/badge/language-NPB-orange)

---

## 📖 Example

### NPB

```npb
val name = "Olexandr";
var age = 16;

writeL("Hello!");
writeL("My name is ${name}");
writeL("I'm ${age} years old");
```

### JavaScript output

```js
const name = "Olexandr";
let age = 16;

console.log("Hello!");
console.log(`My name is ${name}`);
console.log(`I'm ${age} years old`);
```

---

## 🛠️ Installation

```bash
git clone https://github.com/0xNiWt/NPB.git

cd NPB

npm install
```

---

## ⚙️ Compile

```bash
npm run compile -- examples/app.npb
```

---

## 🗺️ Roadmap

- [x] Lexer
- [x] Parser
- [x] Variables
- [x] String interpolation

---

## 👨‍💻 Author

Created by Olexandr Mykhailov (0xNiWt).

Started on July 2026.
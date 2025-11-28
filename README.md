# Enigma-Grid

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) ![HTML5](https://img.shields.io/badge/HTML-5-orange?logo=html5) ![CSS3](https://img.shields.io/badge/CSS-3-blue?logo=css3) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript) ![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?logo=greensock)

**Live demo:** https://sarangnayak.github.io/Enigma-Grid/

---

## Summary

**Enigma-Grid** is an interactive encryption simulator that visualizes XOR-based encryption using a **23 × 23** grid. Each cell in the grid contributes to a binary seed (23×23 = 529 bits). The grid seed is used as a stream key to XOR-encrypt arbitrary text; the encrypted output is presented as Base64. The UI includes a neon/cyber theme, an animated particle background, copy-to-clipboard controls, and a seed reveal toggle for learning and demonstration.

---

## Features

- Interactive **23 × 23** grid that generates a **529-bit** binary seed
- Real-time **XOR** encryption of plaintext using the generated seed
- Encrypted output encoded to **Base64**
- Show / hide binary seed (seed reveal)
- Copy buttons for plaintext, ciphertext, and seed
- Animated background particles and smooth GSAP transitions
- Responsive layout and accessible controls

---

## How it works (short)

1. Grid generates a pseudo-random binary stream (one bit per grid cell → 529 bits).  
2. Plaintext is converted to bytes. Each plaintext byte is XORed with bits from the seed stream (stream cipher style).  
3. Result bytes are Base64-encoded and shown as the encrypted output.

> Note: This is an educational demo that visualizes XOR stream-cipher behavior. It is **not** intended as production cryptography.

---

## Demo / Preview

Open the live demo at:  
https://sarangnayak.github.io/Enigma-Grid/

 `assets/preview.png`

---

## Folder structure


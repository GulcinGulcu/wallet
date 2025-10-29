# Fullstack Wallet App

A **cross-platform (iOS/Android) expense tracker** built with **React Native** and **Expo**, featuring **Clerk authentication**, real-time balance updates, and a cloud-hosted **Express + Postgres** backend. The entire stack is deployable on **free-tier tooling**, making it easy to run and scale.

---

## Features

- 🔐 **Authentication via Clerk** — Email-based signup/login with 6-digit email verification.  
- ➕ **Add Income/Expenses** — Track transactions with **live balance calculations**.  
- 🧼 **Delete Transactions** — Remove entries seamlessly.  
- 🔄 **Pull-to-Refresh** — Implemented from scratch for smooth Recent Transactions updates.  
- 🔁 **Logout Flow** — Effortlessly switch between accounts.  
- 🌐 **Cloud Backend** — Express REST API with Neon-hosted Postgres, accessible by the mobile app.  
- 🧠 **Rate Limiting** — Redis-based protection for the API to prevent abuse.

---

## Tech Stack

### **Frontend**
- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)  
- Clerk for authentication  
- Pull-to-refresh UX built manually

### **Backend**
- [Express](https://expressjs.com/) REST API  
- [Postgres](https://neon.tech/) (Neon-hosted)  
- [Redis](https://redis.io/) for rate limiting  
- Deployed on free cloud services Render

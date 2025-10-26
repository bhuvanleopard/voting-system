# 📊 Real-Time Voting System UI

> A React + TypeScript component demonstrating the frontend for a live polling system. This UI is designed to handle real-time data synchronization via WebSockets, providing instantaneous poll results and dynamic data visualization.

## ✨ Core Features

This project is a showcase of a high-performance, real-time application frontend:

* **Real-Time Data Sync:** Implemented a persistent, bi-directional communication channel using WebSockets, enabling instantaneous submission of ratings and live synchronization of poll results across all connected clients.
* **Dynamic Result Visualization:** Developed a responsive front-end interface that listens for WebSocket events to dynamically render and animate result charts in real-time, providing an engaging and interactive user experience.
* **Scalable Backend Architecture:** (Concept) Engineered a robust server-side application capable of managing multiple concurrent WebSocket connections, efficiently processing incoming votes, and broadcasting updates to maintain data integrity at scale.

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Core Concept:** WebSockets (for real-time data)

## 🚀 Getting Started

This project was bootstrapped with [Vite](https://vitejs.dev/).

### Prerequisites

* Node.js (v18 or newer)
* `npm` or `yarn`

### Installation & Running

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/bhuvanleopard/voting-system.git](https://github.com/bhuvanleopard/voting-system.git)
    cd voting-system
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the port specified in your terminal) to view it in the browser.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

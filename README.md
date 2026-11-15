# Threads Clone

A frontend clone of [Threads](https://www.threads.com/), built with React and Vite. This project recreates the core social networking experience, including authentication, a post feed, post interactions, replies, and user moderation actions.

**Live Demo:** [https://hungomega.github.io/Threads/](https://hungomega.github.io/Threads/)

## Preview

<!-- Add project screenshots here -->

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React 19, JavaScript |
| Build Tool | Vite |
| Routing | React Router |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui, Radix-based components |
| State Management | Redux Toolkit, React Redux |
| HTTP Client | Axios |
| Form Management | React Hook Form |
| Form Validation | Yup, @hookform/resolvers |
| Icons | Lucide React |

## Features

### 1. Authentication
- User login with email, username, or phone identifier.
- User registration.
- Username and email availability checking.
- Email verification using a token.
- Forgot password functionality.
- Password reset with token validation.
- Persistent authentication using Access Token and Refresh Token.
- Automatic token refresh using Axios interceptors.
- Protected routes for authenticated users.

### 2. Home Feed
- Fetch posts from the backend API.
- Display post content, author information, timestamps, and media.
- Infinite scrolling to load more posts.
- Loading and error states.
- Display image and video attachments.

### 3. Post Interactions
- Like and unlike posts.
- Reply to posts.
- Repost and unrepost.
- Quote posts.
- Share posts.
- Save and unsave posts.

### 4. Post Management
- Edit and delete your own posts.
- Mark posts as not interested.
- Mute users.
- Restrict users.
- Block users.
- Report posts.
- Copy post links.
- Generate embedded post content.

### 5. Reply System
- Create replies with text content.
- Upload image and video attachments.
- Select reply permissions.
- Add topics to replies.
- Fetch replies from the backend.

### 6. Post Embedding
- Dedicated embed layout without the main navigation.
- Display embedded post content.
- Provide a link to view the original post on Threads.

## Project Structure

```text
Theads/
├── public/
│   ├── favicon.png
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Loading/
│   │   ├── LoginPanel/
│   │   ├── ProtectedRoute/
│   │   ├── Sidebar/
│   │   ├── post/
│   │   └── ui/
│   │
│   ├── hooks/
│   │   └── useInfiniteScroll.js
│   │
│   ├── layouts/
│   │   ├── AuthLayout/
│   │   ├── DefaultLayout/
│   │   └── EmbedLayout.jsx
│   │
│   ├── pages/
│   │   ├── Activity/
│   │   ├── Auth/
│   │   ├── Create/
│   │   ├── Embed.jsx
│   │   ├── Home/
│   │   ├── Profile/
│   │   └── Search/
│   │
│   ├── redux/
│   │   ├── slices/
│   │   └── store.js
│   │
│   ├── schemas/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hungomega/Threads.git
```

2. Navigate to the project directory:

```bash
cd Threads
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in your terminal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## API Integration

This project communicates with the F8 Threads API using Axios.

**API Base URL:**

```text
https://threads.f8team.dev/api
```

API services are organized into separate modules:

- `auth.service.js` – Authentication and account management.
- `postService.js` – Feed, posts, replies, and post interactions.
- `axios.js` – Axios instance, request interceptors, and automatic token refresh.

## Deployment

The application is deployed using **GitHub Pages** and **GitHub Actions**.

The deployment workflow:

1. Installs project dependencies.
2. Builds the application using Vite.
3. Uploads the production `dist` directory.
4. Deploys the build artifact to GitHub Pages.

**Live Demo:** [Threads Clone](https://hungomega.github.io/Threads/)

## Development Notes

This project is developed as a frontend learning project inspired by Threads.

Some pages, including Search, Activity, Create, and Profile, are currently at an initial implementation stage. The project focuses primarily on authentication, the home feed, post interactions, replies, and API integration.

## Author

**Nguyễn Hữu Hùng**

- GitHub: [@hungomega](https://github.com/hungomega)
- Project Repository: [Threads Clone](https://github.com/hungomega/Threads)

---

*Built with React, JavaScript, and a passion for learning frontend development.*

# Anonymous Feedback Platform

A full-stack web application that enables users to collect feedback anonymously via shareable form links. Built with Next.js, MongoDB, NextAuth, and OpenAI integration, the platform supports secure authentication, anonymous form submissions, AI-enhanced feedback moderation, and email notifications.

---

## Features

- **Anonymous Feedback Forms** – Users generate unique links to collect feedback from anyone without revealing identities.
- **Authentication** – Sign in/up via credentials or providers using NextAuth.
- **Form Management** – Authenticated users can create, edit, and delete feedback forms.
- **Secure Feedback Submission** – Feedback is anonymous and stored securely in MongoDB.
- **Email Notifications** – Feedback alerts sent using Resend and React Email.
- **Feedback Moderation (Optional)** – Integrate OpenAI to auto-moderate or summarize feedback.
- **Dark Mode & Responsive UI** – Built with Tailwind CSS, Radix UI, and lucide-react icons.
- **Form Validation** – Handled via `react-hook-form`, Zod schema validation, and resolver integration.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router compatible)
- **Frontend**: React 18, Tailwind CSS, ShadcnUI, Lucide Icons
- **Backend**: MongoDB (via Mongoose), NextAuth for authentication
- **AI Integration**: OpenAI via `ai` and `openai` SDKs
- **Email Service**: Resend + React Email
- **State/Form Management**: React Hook Form, Zod, usehooks-ts
- **Security**: BcryptJS for password hashing, JWT for token operations

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/izumiicxde/anonymous-feedback-nextjs.git
cd random-feedback-platform
```

### 2. Install dependencies

npm install

### 3. Configure environment variables

Create a `.env.local` file at the root with the following keys:

```
MONGODB_URI=your_mongo_connection_string || "mongodb://127.0.0.1:27017/db_name" # if needed for local
JWT_SECRET_KEY=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
NEXTAUTH_SECRET=your_nextauth_secret
OPENAI_API_KEY=your_openai_key_if_using_ai

```

### 4. Run the development server

npm run dev

---

## Scripts

- `dev` – Start the development server
- `build` – Build for production
- `start` – Start production server
- `lint` – Run ESLint for code quality

---

## Notes

- OpenAI integration is optional but recommended for feedback analysis and abuse detection.
- Resend email templates are configured via `@react-email/components` and `react-email`.

---

## License

MIT License

---

## Author

Developed by [Your Name or Alias]

A modern anonymous feedback platform for individuals and teams.

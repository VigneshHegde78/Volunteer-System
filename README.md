# Volunteer Registration & Management System

An end-to-end, type-safe Volunteer Registration Web Application built for the **NayePankh Foundation**. This system allows public users to register as volunteers with immediate client-side validation, while isolating a secure Admin Dashboard behind a state-aware authentication layer to track and manage registrations.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Type Safety)
- **Styling:** Tailwind CSS (Responsive Design)
- **Backend-as-a-Service (BaaS):** Appwrite SDK (Authentication & Databases)

---

## 📂 Project Architecture

The codebase follows clean separation of concerns, isolating data configurations, utilities, validation logic, and specific UI component trees:

```text
src/
├── app/
│   ├── layout.tsx              # Global providers & base configuration
│   ├── page.tsx                # Public Registration Form Page
│   └── admin/
│       ├── layout.tsx          # Protected Route Layout (Global Session Guard)
│       ├── login/
│       │   └── page.tsx        # Admin Authentication Interface
│       └── dashboard/
│           └── page.tsx        # Secure Volunteer Database Panel
├── components/
│   └── form/
│       └── registration-form.tsx # Controlled, Accessible Registration Form
├── lib/
│   ├── appwrite.ts             # Appwrite SDK Engine Initializer (Singleton Pattern)
│   └── validation.ts           # Pure Validation Functions (Regex-driven)
└── types/
    └── index.ts                # Shared Domain Interfaces & Appwrite Intersections

```

---

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repository-url>
cd volunteer-system
npm install

```

### 2. Configure Environment Variables

Create a `.env.local` file at the root of the project and populate it with your Appwrite API credentials:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_APPWRITE_DATABASE_ID="your_database_id"
NEXT_PUBLIC_APPWRITE_COLLECTION_ID="your_collection_id"

```

### 3. Run the Application

```bash
# Start development server
npm run dev

# Run production compilation check
npm run build

```

---

## 🔑 Tester Credentials

To review the secure panel during evaluation, navigate to `/admin/dashboard`. You will be automatically redirected to the login guard screen. Use the following pre-configured sandbox testing account:

- **Admin Email:** `admin@test.com`
- **Password:** `#Test123`

---

## 🛡️ Key Structural Implementation Details

- **Route Protection:** Handled via a nested higher-order App Router layout (`/admin/layout.tsx`). It intercepts rendering to fetch active session records with `account.get()`. If unauthorized, it boots the client out to `/admin/login`.
- **Validation Layer:** Driven by pure functions and Regex string tracking to check parameters directly on the client, minimizing network payloads.
- **Appwrite Schema Mapping:** Maps structural attributes smoothly (`name`, `email`, `phone`, `skills`) while leveraging Appwrite's built-in `$createdAt` metadata parameter to ensure clean storage constraints.

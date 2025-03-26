# 📚 E-Learning Platform

## 🚀 Overview
E-Learning Platform is a modern and scalable online education system built on top of the MERN stack. It provides seamless access to learning materials, video summaries using AI transcription, and a structured role-based dashboard for students and teachers. Secure authentication, payment integration, and cloud-based media storage enhance the user experience.

## ✨ Features
✅ AI-Powered Transcription & Summarization (Assembly AI API) 🧠  
✅ Role-Based Dashboards (Students & Teachers) 📊  
✅ Secure Authentication (Google OAuth via Firebase) 🔐  
✅ Video & Image Storage (Cloudinary) 📁  
✅ Payment Integration (Stripe) 💳  
✅ Responsive & Modern UI (Tailwind CSS + ShadCN + Flowbite Components) 🎨  
✅ Smooth Navigation & User Experience 🔄  

## 🛠️ Technologies Used
- **Frontend:** React.js, Tailwind CSS, ShadCN, Flowbite Components
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase (Google OAuth)
- **Payment:** Stripe API
- **AI Integration:** Assembly AI (Speech-to-Text Summarization)
- **Media Storage:** Cloudinary
- **Deployment:** Vercel (Frontend), Render (Backend)

## 📁 Project Structure
```
E-LEARNING_PLATFORM/
├── client/           # Frontend with React
│   ├── public/       # Static assets
│   ├── src/          # Components & pages
│   ├── .env          # Frontend environment variables
│   ├── package.json  # Frontend dependencies
│   └── vite.config.js
├── server/           # Backend with Express & MongoDB
│   ├── config/       # Configuration files
│   ├── models/       # Database models (MongoDB)
│   ├── routes/       # API routes (Video, Auth, Payment, etc.)
│   ├── controllers/  # Request handling logic
│   ├── .env          # Backend environment variables
│   ├── package.json  # Backend dependencies
│   └── app.js        # Main server file
├── README.md         # Project documentation
└── LICENSE           # Project license
```

## 📥 Installation & Setup
To run this project locally, follow these steps:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/e-learning-platform.git
cd e-learning-platform
```

### 2️⃣ Install dependencies
#### Frontend
```bash
cd client
npm install
```
#### Backend
```bash
cd ../server
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in both `client/` and `server/` directories with the necessary variables.

#### 📂 Server .env (Backend)
```
PORT=5000
MONGO_URI=your_mongodb_connection_url
FIREBASE_API_KEY=your_firebase_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ASSEMBLY_AI_API_KEY=your_assembly_ai_api_key
FRONTEND_URL=http://localhost:5173
```

#### 📂 Client .env (Frontend)
```
VITE_PUBLIC_URL=your_backend_api_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_CLOUDINARY_URL=your_cloudinary_upload_url
```

### 4️⃣ Start Development Servers
#### Start Backend (Server)
```bash
cd server
npm run dev
```

#### Start Frontend (Client)
```bash
cd ../client
npm run dev
```

🌐 App will run at: `http://localhost:5173`

## 🌍 Deployment
### 🚀 Deploy Frontend (Vercel)
1. Push the latest code to GitHub.
2. Connect the repository to Vercel.
3. Set the root directory to `client/`.
4. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add environment variables
5. Click Deploy.

### 🚀 Deploy Backend (Render)
1. Push the latest code to GitHub.
2. Create a new web service in Render.
3. Set the root directory to `server/`.
4. Configure:
   - Start Command: `npm start`
   - Environment Variables: Paste from `.env`
5. Click Deploy.

## 🤝 Contributing
Want to contribute? Follow these steps:
1. Fork the repository.
2. Clone it:
   ```bash
   git clone https://github.com/yourusername/e-learning-platform.git
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature-xyz
   ```
4. Commit changes:
   ```bash
   git commit -m "Added XYZ feature"
   ```
5. Push to your branch:
   ```bash
   git push origin feature-xyz
   ```
6. Open a Pull Request 🚀

## 📜 License
This project is licensed under the MIT License.

## 🎉 Acknowledgements
🔹 Backend development by **Sarah Maheen** 💻  
🔹 Frontend development by **Batchmate** 🎨


module.exports = {
  apps: [
    {
      name: "devextech-app",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        NEXTAUTH_URL: "https://devextech.pro",
        NEXTAUTH_SECRET: "your_nextauth_secret_here",
        GOOGLE_ID: "your_google_client_id_here",
        GOOGLE_SECRET: "your_google_client_secret_here",
        MONGODB_URI: "your_mongodb_uri_here",
      },
    },
  ],
};

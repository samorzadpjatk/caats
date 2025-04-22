# CaaTS - Development Setup Guide

CaaTS consis of three main components:
- `app`: Frontend React application
- `nest`: Backend NestJS server
- `scrapy`: Data scraping service

## Prerequisites

- Node.js (v21 recommended)
- Yarn package manager
- PostgreSQL database
- Google OAuth credentials (for authentication)

## Initial Setup

1. Clone the repository:
```bash
git clone https://github.com/kpostekk/caats.git
cd caats
```

2. Install dependencies for all packages:
```bash
yarn install
```

3. Environment Setup:

### Backend (nest) Setup
1. Navigate to the `packages/nest` directory
2. Copy the `.example.env` file to `.env`:
```bash
cp .example.env .env
```
3. Update the `.env` file with your configuration:
```env
DATABASE_URL="postgres://dev:dev@localhost:5432/caats"  # Update with your PostgreSQL credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_SECRET="your-google-secret"
JWT_SECRET="your-generated-jwt-secret"  # Generate using: node -e "console.log(require('crypto').randomBytes(128).toString('base64url'))"
BASE_URL="http://127.0.0.1:3000"
```

### Frontend (app) Setup
1. Navigate to the `packages/app` directory
2. Create a `.env` file:
```bash
echo "VITE_GOOGLE_CLIENTID=your-google-client-id" > .env
```
Note: Use the same Google Client ID as in the backend configuration.

### Scrapy Setup
The scrapy service requires the backend to be running as it communicates with it through GraphQL.

## Running the Development Environment

Each package can be run independently in development mode:

### Backend (nest)
```bash
# In packages/nest directory
yarn dev
```
The backend will be available at http://localhost:3000

### Frontend (app)
```bash
# In packages/app directory
yarn dev
```
The frontend development server will start at http://localhost:5173

### Scrapy Service
```bash
# In packages/scrapy directory
yarn build  # Build the service first
yarn scrapy
```

## Development Commands

### Frontend (app)
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn codegen` - Generate GraphQL types
- `yarn storybook` - Run Storybook for component development

### Backend (nest)
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn codegen` - Generate GraphQL types
- `yarn test:e2e` - Run end-to-end tests

### Scrapy
- `yarn build` - Build the service
- `yarn codegen` - Generate GraphQL types
- `yarn scrapy` - Run the scraper

## Additional Notes

1. The frontend is configured to proxy GraphQL requests to the backend during development. This is handled by the Vite configuration.

2. For development, make sure your PostgreSQL database is running and accessible with the credentials specified in your `.env` file.

3. The Google OAuth credentials need to be set up in the Google Cloud Console and configured in both frontend and backend environments.

4. Each package has its own TypeScript configuration and build process. Make sure to run `yarn build` when making changes to shared types or interfaces.

5. The project uses various code generation tools for GraphQL. Run `yarn codegen` in the respective packages when making changes to GraphQL schemas or queries.

## Troubleshooting

1. If you encounter database connection issues:
   - Verify PostgreSQL is running
   - Check the `DATABASE_URL` in your `.env` file
   - Ensure the database exists and is accessible

2. If authentication isn't working:
   - Verify Google OAuth credentials are correctly set up
   - Ensure the same `GOOGLE_CLIENT_ID` is used in both frontend and backend
   - Check that the OAuth redirect URIs are properly configured in Google Cloud Console

3. For build issues:
   - Clear the `dist` directories
   - Remove `node_modules` and run `yarn install` again
   - Ensure all dependencies are installed with `yarn install`



## Google Cloud OAuth Configuration
1. **Create a Google Cloud Project**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Name it something like "CaaTS Development"
5. Click "Create"

2. **Enable OAuth 2.0 API**

1. In the left sidebar, go to "APIs & Services" > "Library"
2. Search for "OAuth"
3. Click on "OAuth 2.0" or "Google OAuth2 API"
4. Click "Enable"

3. **Configure OAuth Consent Screen**

1. In the left sidebar, go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type (this is fine for development)
3. Click "Create"
4. Fill in the required information:
   ```
   App name: CaaTS Development
   User support email: [your email]
   Developer contact email: [your email]
   ```
5. Click "Save and Continue"
6. On "Scopes" page, click "Save and Continue"
7. On "Test users" page:
   - Click "Add Users"
   - Add your Google email address
   - Click "Save and Continue"
8. Review the summary and click "Back to Dashboard"

4. **Create OAuth 2.0 Credentials**

1. In the left sidebar, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Name it "CaaTS Local Development"
5. Under "Authorized JavaScript origins", add:
   ```
   http://localhost:5173
   http://localhost:3000
   ```
6. Under "Authorized redirect URIs", add:
   ```
   http://localhost:3000/auth/google/redirect
   http://localhost:5173/auth/google/redirect
   ```
7. Click "Create"
8. You'll get a popup with your credentials. Save both the **Client ID** and **Client Secret**

5. **Configure Your Local Environment**

1. In the `packages/nest` directory, create `.env` file:
```bash
cd packages/nest
cp .example.env .env
```

2. Edit the `.env` file with your credentials:
```env
DATABASE_URL="postgres://dev:dev@localhost:5432/caats"
GOOGLE_CLIENT_ID="your-client-id-here"
GOOGLE_SECRET="your-client-secret-here"
JWT_SECRET="generate-this-in-next-step"
BASE_URL="http://localhost:3000"
```

3. Generate JWT_SECRET by running this command in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(128).toString('base64url'))"
```
Copy the output into your `.env` file as the JWT_SECRET value.

4. In the `packages/app` directory, create `.env` file:
```bash
cd ../app
echo "VITE_GOOGLE_CLIENTID=your-client-id-here" > .env
```
Use the same Client ID as in the backend configuration.

6. **Verify Setup**

1. Start your PostgreSQL database (from my previous instructions)
2. Start the backend:
```bash
cd ../nest
yarn dev
```

3. In a new terminal, start the frontend:
```bash
cd ../app
yarn dev
```

4. Visit `http://localhost:5173` in your browser
5. Try to log in - you should be able to use your Google account (the one you added as a test user)

Common Issues and Solutions:

1. **"Error: redirect_uri_mismatch"**
   - Double-check your authorized redirect URIs in Google Cloud Console
   - Make sure they exactly match what's being used in the application

2. **"Error: invalid_client"**
   - Verify your GOOGLE_CLIENT_ID and GOOGLE_SECRET are correctly copied
   - Make sure there are no extra spaces or quotes in your .env files

3. **"Error: access_denied"**
   - Make sure you've added your email as a test user in the OAuth consent screen
   - Try clearing your browser cookies and cache

Would you like me to explain any of these steps in more detail or help troubleshoot any issues you encounter?

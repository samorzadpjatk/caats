# CaaTS - Development Setup Guide

CaaTS consists of three main components:
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

I also needed to add this to the `.env` file:
```env
MEILI_URL="http://localhost:7700"
MEILI_MASTER_KEY="" # your master key
```
more about [meili search](#configure-meili-search)
### Frontend (app) Setup
1. Navigate to the `packages/app` directory
2. Create a `.env` file:
```bash
echo "VITE_GOOGLE_CLIENTID=your-google-client-id" > .env
```
Note: Use the same Google Client ID as in the backend configuration.

### Scrapy Setup
The scrapy service requires the backend to be running as it communicates with it through GraphQL.

I had some problems with running that. It needs a token that I first I thought needs to be generated from the caats app settings, but there's only "work in progress" in privacy and security tabs in the settings.

One idea is to grant myself superuser priviliges in the database.
```psql
caats=> SELECT id, email, "isSuperuser" FROM "User";
                  id                  |        email         | isSuperuser
--------------------------------------+----------------------+-------------
 80ae4589-....-....-....-b9c90da3e100 | s33621@pjwstk.edu.pl | f
(1 row)

```
we can see that isSuperuser is set to false for me
update isSuperuser column to true:
`caats=> UPDATE "User" SET "isSuperuser"=true WHERE id='80ae4589-....-....-....-b9c90da3e100';`

now in the application settings on the frontend I got the superuser tab with a button "skopiuj token". lets work with that.
in scrapy `.env` do:

```env
TOKEN="the token"
NEST_GRAPHQL="http://localhost:3000/graphql"
```

now we should be able to build the scraper.
run `yarn build` and got this error:
```bash
prybiec@m1chine:~/fun/caats/packages/scrapy$ yarn build
yarn run v1.22.22
$ tsc --noEmit && swc src/ -d dist/
src/stealer.ts:50:18 - error TS18047: 'body' is possibly 'null'.

50       pageBody = body.removeWhitespace().toString() // sanitization
                    ~~~~


Found 1 error in src/stealer.ts:50

error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
added this check before:
```ts
if (!body) throw new Error('RadAjaxPanel1 element not found')
```
it builds fine now.

run this command `yarn scrapy steal --api "http://localhost:3000/graphql" --rate 30`:
```bash
prybiec@m1chine:~/fun/caats/packages/scrapy$ yarn scrapy steal --api "http://localhost:3000/graphql" --rate 30
yarn run v1.22.22
$ swc src/ -d dist/
Successfully compiled: 3 files with swc (68.45ms)
$ node dist/index.js steal --api http://localhost:3000/graphql --rate 30
Starting Stealer...
{ fullTask: undefined }
Task succeeded! o((>ω< ))o
{ fullTask: undefined }
Task succeeded! o((>ω< ))o
{ fullTask: undefined }

```
succeeded but task undefined... hmm lets whether the calendar works properly now.

running graphql scripts in graphql console doesnt do much either. i get "unauthorized" or "successful" message but the scraper never works.


at this point i don't know if there's some fault on my end or the `https://planzajec.pjwstk.edu.pl/PlanOgolny3.aspx` because it's empty for this week.
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

2. Go to [Google Cloud Console](https://console.cloud.google.com/)
3. Click on the project dropdown at the top of the page
4. Click "New Project"
5. Name it something like "CaaTS Development"
6. Click "Create"

7. **Enable OAuth 2.0 API**

8. In the left sidebar, go to "APIs & Services" > "Library"
9. Search for "OAuth"
10. Click on "OAuth 2.0" or "Google OAuth2 API"
11. Click "Enable"

12. **Configure OAuth Consent Screen**

13. In the left sidebar, go to "APIs & Services" > "OAuth consent screen"
14. Select "External" user type (this is fine for development)
15. Click "Create"
16. Fill in the required information:
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

9. **Create OAuth 2.0 Credentials**

10. In the left sidebar, go to "APIs & Services" > "Credentials"
11. Click "Create Credentials" > "OAuth client ID"
12. Choose "Web application"
13. Name it "CaaTS Local Development"
14. Under "Authorized JavaScript origins", add:
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

## Configure meili search
after starting up nest backend with `yarn dev` i got error that `MEILI_URL` key doesnt exist in the configuration, let's set it up:

```bash
brew install meilisearch

# generate random key
openssl rand -base64 32

meilisearch --master-key="generated key"
```
by default it will run on `http://localhost:7700`.

Add these Meilisearch configurations to the nest `.env` file:
```
MEILI_URL="http://localhost:7700"
MEILI_MASTER_KEY="the-key-you-generated"  # The same key you used to start Meilisearch
```

check service status with:
```bash
curl http://localhost:7700/health
```
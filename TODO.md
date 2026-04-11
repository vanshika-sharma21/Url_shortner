# TODO: Fix Backend Startup Errors

## Steps:
1. [x] Create database schema (tables: users, urls, visits) - Run schema.sql in MySQL
2. [x] Verify Backend/.env has correct MySQL credentials (DB_HOST=localhost, DB_USER=root, DB_PASSWORD=yourpass, DB_NAME=url_shortner, JWT_SECRET=secret, BACKEND_URL=http://localhost:5000)
3. [ ] cd URL_Shortner/Backend && npm install
4. [ ] cd URL_Shortner/Backend && npm run dev  (should log 'Server running on port 5000')
5. [ ] cd URL_Shortner/frontend && npm install && npm run dev
6. [ ] Test: http://localhost:3000 (frontend), http://localhost:5000/health (backend)

## Progress: 2/6

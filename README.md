## ChatBot :
  ## Present work done by chatbot 
  Users should be able to come in and ask questions regarding the treatments that the clinic offers, ask for
  information regarding the doctors, or ask about any pre-op and post-op queries which they might have.  
## Clone Project:
    -> 

## FrontEnd SetUp:
    -> .env: NEXT_PUBLIC_API_URL
    -> npm install
    -> npm run dev (start the front end)
    
    
## Backend Setup:
    -> PORT :5000
    -> .env: MONGODB_URL, GEMINI_KEY
    -> npm install
    ->  npm run build (tsc)
    -> npm start

## API:   
   -> POST http://localhost:5000/api/v1/chat/new
   -> GET http://localhost:5000/api/v1/chat/all-chats

🚀 Project Overview
-------------------

The frontend is a **React-based chat interface**. It authenticates users via Google OAuth, calls backend APIs with an idToken, and displays conversation history with AI responses.

🔑 Authentication Flow
----------------------

*   Uses **Google OAuth**.
    
*   After login → frontend gets an idToken.
    
*   Every API request includes this idToken.
    
*   Backend middleware (verifyGoogleToken) validates it.
    

🌐 API Route Usage
------------------

1.  **/create-user-session**
    
    *   Called after login.
        
    *   Ensures session exists in Redis.
        
2.  **/save-message**
    
    *   Called whenever a user sends a new message.
        
    *   Stores the message under .
        
3.  **/get-messages**
    
    *   Retrieves chat history when chat window loads/refreshes.
        
4.  **/clear-session**
    
    *   Clears chat history but keeps session valid.
        
5.  **/get-response**
    
    *   Sends query to backend → Gemini API.
        
    *   AI reply is saved + returned to UI.
        

💬 End-to-End User Flow
-----------------------

1.  User logs in via Google → gets idToken.
    
2.  Frontend → /create-user-session.
    
3.  User sends message → /save-message.
    
4.  Frontend → /get-response.
    
    *   Backend validates idToken, queries Gemini API.
        
    *   Response saved via /save-message.
        
5.  Chat UI displays both messages.
    
6.  On refresh → /get-messages restores chat.
    
7.  On clear → /clear-session wipes Redis messages.
    
8.  On logout → local storage cleared.
    

🎨 UI & State Management
------------------------

*   React components: ChatWindow, Message, Auth.
    
*   Protected routes: ProtectedRoute ensures only logged-in users can access chat.
    
*   Local storage: Maintains login state (auth) + idToken + email.
    

🛠 Future Improvements
----------------------

*   Multi-conversation support → conversation\_id per chat.
    
*   Optimistic UI updates → show message before backend confirms.
    
*   Better error handling for Gemini API overload (503s).
    
*   Multi-device session sync once MySQL DB is added.

  ### Redis TTL & Cache Warming Strategy
------------------------------------------
1. Session Messages (`<session_id> → messages[]`)  
   - TTL: 24 hours (auto-clears inactive sessions).  
   - On every new message, TTL is refreshed.

2. Email ↔ Session Mapping (`<email> → <session_id>`)  
   - No TTL (persists until logout).  
   - Ensures stable mapping for users.

3. Cache Warming  
   - On login, preload last 10 messages into Redis from DB.  
   - Background cron job refreshes popular queries every 6h.  
   - Frequently asked queries (e.g., trending news) cached for 1 hour.
  
### Redis TTL & Cache Warming Strategy
----------------------------------------
1. Session Messages (`<session_id> → messages[]`)  
   - TTL: 24 hours (auto-clears inactive sessions).  
   - On every new message, TTL is refreshed.

2. Email ↔ Session Mapping (`<email> → <session_id>`)  
   - No TTL (persists until logout).  
   - Ensures stable mapping for users.

3. Cache Warming  
   - On login, preload last 10 messages into Redis from DB.  
   - Background cron job refreshes popular queries every 6h.  
   - Frequently asked queries (e.g., trending news) cached for 1 hour.
  
### Reference Material  
----------------------
We curated a list of ~50 global news RSS feeds and sample AI questions for evaluation.  
Full list available here: [Google Doc](https://docs.google.com/document/d/1tHGzBD-72pW6NALvXeAVPfZ4KVv1efFI42fWU8g1kc4/edit?usp=sharing)  



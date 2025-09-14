const API_URL = import.meta.env.VITE_BACKEND_URL;

console.log('api url : ',API_URL);

export const getSessionId = async(email, idToken)=> {
    try {
        const response = await fetch(`${API_URL}/user/create-user-session`,{
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    email: email
                })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch session ID');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching session ID:', error);
        return null;
    }
}

export const getSessionMessages = async(sessionID, idToken) => {
    try {
        const response = await fetch(`${API_URL}/session/get-messages`,{
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    sessionId: sessionID
                })
        });


        if (!response.ok) {
            throw new Error('Failed to fetch session messages');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching session messages:', error);
        return null;
    }
}

export const saveSessionMessages = async(sessionID, role, content, idToken) => {
    try {
        const response = await fetch(`${API_URL}/session/save-message`,{
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    sessionId: sessionID,
                    role: role,
                    content: content
                })
        });


        if (!response.ok) {
            throw new Error('Failed to save session messages');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving session message:', error);
        return null;
    }
}

export const deleteSessionMessages = async(sessionID, idToken) => {
    try {
        const response = await fetch(`${API_URL}/session/clear-session`,{
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    sessionId: sessionID
                })
        });


        if (!response.ok) {
            throw new Error('Failed to delet session');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting session :', error);
        return null;
    }
}

export const getGeminiResponse = async(query, idToken) => {
    try {
        const response = await fetch(`${API_URL}/bot/get-response`,{
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    userQuery: query
                })
        });


        if (!response.ok) {
            throw new Error('Failed to delet session');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting session :', error);
        return null;
    }
}
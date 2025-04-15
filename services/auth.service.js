const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

function generateAccessToken(user){

    console.log("Auth Service", user)
    const payload = {
        username: user.username,
        email: user.email,
        roles: user.roles
    }

    const secret = process.env.TOKEN_SECRET;
    const options = {expiresIn: '1h'};

    return jwt.sign(payload, secret, options);  // δημιουργεί το token προσθέτοντάς του το playload, to secret και το expiration period
}

function verifyAccessToken(token){
    const secret = process.env.TOKEN_SECRET;
    try {
        const payload = jwt.verify(token, secret);
        console.log("VerifyToken", payload);
        return { verified: true, data: payload };
    }   catch (err) { 
        return { verified: false, data: err }
    }
}

async function googleAuth(code) {
    console.log('Google Login', code);
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;

    const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    try {
        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code); // object destructuring του token response (μεταβλητής απ' το oAuth library) - όταν κάνουμε login παίρνουμε ένα code, το οποίο ανταλλάζουμε για ένα token με στοιχεία, μεταξύ των οποίων, τα στοιχεία του χρήστη
        console.log("Step 1", tokens);
        oauth2Client.setCredentials(tokens);    // βάζει τα tokens στον OAuth2Client

        const ticket = await oauth2Client.verifyIdToken({   // πιστοποίηση ότι τα παρακάτω στοιχεία προέρχονται απ' την Google
            idToken: tokens.id_token,
            audience: CLIENT_ID
        });

        console.log("Step 2");
    
        const userInfo = await ticket.getPayload(); // αφού ολοκληρωθεί η πιστωποίηση, επιστρέφεται το payload με τα στοιχεία του χρήστη
        console.log("Google User", userInfo);
        return {user: userInfo, tokens};


    } catch (error) {
        console.log("Error in google authentication.", error);
        return { error: "Failed to authenticate with Google."};
    }
}

module.exports = { generateAccessToken, verifyAccessToken, googleAuth };
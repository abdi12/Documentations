const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();

// Create a session store
const memoryStore = new session.MemoryStore();

// Session
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Keycloak
const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware({
  admin: '/'
}));

// Routes
app.get('/', (req, res) => {
  let authLink = '<a href="/protected">Login</a>';
  if (req.kauth && req.kauth.grant) {
    authLink = '<a href="/logout">Logout</a>';
  }

  res.send(`
    <h1>Keycloak Login Demo</h1>
    <p>${authLink}</p>
    <p><a href="/protected">Go to protected resource</a></p>
  `);
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  const redirectUri = 'http://localhost:3000/';
  const logoutUrl = keycloak.logoutUrl(redirectUri);
  res.redirect(logoutUrl);
});

app.get('/protected', keycloak.protect(), (req, res) => {
  res.send('This is a protected resource.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

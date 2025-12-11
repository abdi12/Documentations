# Keycloak Login Demo

This is a simple Node.js web application that demonstrates a login flow using Keycloak.

## Prerequisites

- Node.js (v22 or later)
- A running Keycloak instance (v26 or later)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Keycloak

To run this demo, you need to configure a Keycloak realm and client that match the settings in `keycloak.json`.

1.  **Create a new realm:**
    *   Log in to your Keycloak administration console.
    *   In the top-left corner, click on the current realm name (e.g., "master") and select **"Add realm"**.
    *   Enter `myrealm` as the realm name and click **"Create"**.

2.  **Create a new client:**
    *   In the `myrealm` realm, go to the **"Clients"** section.
    *   Click **"Create client"**.
    *   Set the **Client ID** to `myclient`.
    *   Leave the **Client type** as `openid-connect`.
    *   Click **"Next"**.

3.  **Configure client settings:**
    *   Ensure **"Standard flow"** is enabled.
    *   Under **"Access settings"**, set the following:
        *   **Valid redirect URIs:** `http://localhost:3000/*`
        *   **Web origins:** `http://localhost:3000`
    *   Click **"Save"**.

The default settings in `keycloak.json` should now match your Keycloak configuration.

```json
{
  "realm": "myrealm",
  "auth-server-url": "http://localhost:8080/",
  "ssl-required": "external",
  "resource": "myclient",
  "public-client": true,
  "confidential-port": 0
}
```

**Note:** If your Keycloak server is running on a different host or port, update the `auth-server-url` accordingly.

### 3. Run the Application

```bash
node index.js
```

The application will be running at [http://localhost:3000](http://localhost:3000).

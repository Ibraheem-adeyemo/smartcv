import NextAuth from "next-auth"
import { getCsrfToken } from "next-auth/client"
import Providers from "next-auth/providers"
import { SCOPE, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SECRET, GRANT_TYPE, PASSPORT_TOKEN_URL, PASSPORT_AUTHORIZE_URL, PASSPORT_PROFILE_URL } from "../../../contants/env-constants"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  // https://qa.interswitchng.com/passport/oauth/token
  providers: [{
      id: "pass",
      name: "Pass",
      type: "oauth",
      version: "2.0",
      scope: SCOPE,
      state: true,
      idToken: false,
      protection: ["state", "pkce"],
      authorizationParams:{
        client_id: CLIENT_ID,
        redurect_uri: REDIRECT_URI,
        scope:SCOPE,
        response_type:RESPONSE_TYPE
      },
      headers: {
        Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${SECRET}`).toString('base64'),
        
      },
      params: { grant_type: GRANT_TYPE },
      accessTokenUrl: `${PASSPORT_TOKEN_URL}`,
      authorizationUrl: `${PASSPORT_AUTHORIZE_URL}`,
      profileUrl: PASSPORT_PROFILE_URL,
      async profile(profile:any, tokens) {
        // You can use the tokens, in case you want to fetch more profile information
        // For example several OAuth providers do not return email by default.
        // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
        console.log({tokens})
        return {
          id: profile.passportId,
          name: profile.firstName + " " + profile.lastName,
          email: profile.email,
          image: profile.passportId
        }
      },
      clientId: CLIENT_ID,
      clientSecret: SECRET
    }

  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/login',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn(user, account, profile) {
      // console.log({user,account, profile })
        
      console.log({user,account, profile })
      return true 
    },
    async redirect(url, baseUrl) { 
      // console.log({url, baseUrl})
      return baseUrl 
    },
    async session(session, user) {

        console.log({session})
      
       return session 
      
      },
    async jwt(token, user, account, profile, isNewUser) { 
    
        console.log({token})
      
      return token 
    
    }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: true,
})

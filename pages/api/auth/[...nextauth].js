import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios';

const options = {
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials property is used to generate a suitable form on the sign in page.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Authentication Logic: local function, external API call, etc
        //const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        try {
          const user = await axios.get("http://127.0.0.1:8000/portal/users/list/");
    
          if (user) {
            console.log(user.data);
            return user.data;
          } else {
            return null;
          }
        } catch(e) {
          throw new Error("There was an error on user authentication");  
        }
      }
    })    
  ],
  session: { 
    jwt: true,
  },
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',    
  }  
}

export default (req, res) => NextAuth(req, res, options);

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import { BASE_URL } from "configs";
import { toFormData } from "utils";
import sha1 from 'sha1'


export default NextAuth({
    // Configure one or more authentication providers
    providers: [


        // ...add more providers here
        CredentialsProvider({
            id: "credentials",
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            type: "credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                user_name: { label: "Username", type: "text", },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const { user_name, password } = credentials;
                const hashpassword = sha1(password)
                let res = await axios.post(`${BASE_URL}/api/login`, toFormData({
                    user_name,
                    password: hashpassword
                }))
                let user = res.data.data;
                // console.log('+++++', user)

                if (user?.token) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/sign-up',
        error: '/login'
    },
    callbacks: {
        async jwt({ token, user, account, isNewUser }) {// This user return by provider {} as you mentioned above MY CONTENT {token:}

            // if (account) {
            //     token.accessToken = account.access_token
            // }
            if (user) {
                token.accessToken = user.token
            }
            // console.log('jwt: token, user, account \n', token, user, account)


            return token;
        },

        // That token store in session
        session: async ({ session, user, token, }) => { // this token return above jwt()
            session.accessToken = token.accessToken;

            // session.user = token.user
            // console.log('###', session, token, user)

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token.accessToken
                }
            }

            // let res;
            // try{
            //     res = await axios.get('http://139.162.6.181/api/auth/user', config)
            // }   

            // catch(e){console.log(e)}



            // let _user = res.data?.data?.user
            // if (_user)
            //     session.user = _user;


            return session;

        },
    },

    secret: "tBazuzvubeJs0Iwj2w++gOfStV99vSnab0G7FmC/9V4="


})
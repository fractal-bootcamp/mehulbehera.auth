// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";


interface UserAuth{

    id:number,
    email:string,
    password:string


}

const users = [
    {

        id: -1,
        email:"failed@failed.com",
        password:"failed"

    },
    {
        id: 1,
        email: "nancy@gmail.com",
        password: "baseball"
    },
    {
        id: 2,
        email: "greg@gmail.com",
        password: "ilovebaseball"
    },
];

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<UserAuth>(sessionStorage);

async function login(email:string,password:string){

    console.log("ran")
    const user = users.find(user => ((user.email === email) && (user.password === password)));
    if(user){
        console.log("ran")
        console.log(email)
        console.log(password)
        console.log(user)
      
        return user;

    }else{

        throw new Error();

    }
}

//what to do if user fails login

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
    let password = form.get("password") as string;
    let user = await login(email, password);
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);


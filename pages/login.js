import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';
import { signIn, useSession ,signOut} from 'next-auth/react';
import { useEffect } from 'react';

import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import Login_validate from '@/lib/validate';
import Image from 'next/image';


const LoginPage=styled.div`
background-color:white;
display:flex;
justify-content:center;
flex-direction:column;

align-items:center;
height:100vh;
gap:20px;
@media (max-width: 1024px){
  height:100%;
  position:relative;
}

`;

const Container = styled.div`
  padding: 20px;
 
  
`;


const Logo = styled.div`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
  color:#8CB7F5;
  font-size:1.5rem;
  display:flex;
align-items:center;
gap:10px;
font-weight:bold;
@media (max-width: 1024px){
  font-size:1rem;
  margin-top:3rem;
  position:relative;

}


`;
const LoginOption=styled.button`
cursor:pointer;
border-radius: 40px;
border: 1px solid #333;

background: #FFF;

display: flex;
width:100%;
position:relative;
height: 40px;
justify-content: center;
align-items: center;
margin-bottom:20px;

p{
  color: #333;

font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
@media (max-width: 1024px){
  position:relative;
  width:80%;
}

`;
const Or=styled.div`
display:flex;
align-items:center;
gap:10px;
p{
  font-size: 20px;
font-weight: 400;
}
div{
  height: 2px;
  width:230px;
  background-color:rgba(102, 102, 102, 0.25);
  @media (max-width: 1024px){
    width:30%;
    position:relative;
  }

}`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top:50px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  position:relative;
height: 30px;
border-radius: 40px;
border: 1px solid #333;

background: #FFF;
@media (max-width: 1024px){
  position:relative;
  width:70%;
}
`;

const Button = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
  position:relative;
height: 50px;
border-radius: 40px;
font-size:20px;
font-weight:500;
@media (max-width: 1024px){
  position:relative;
  width:80%;
}

`;
const Register = styled.button`
  padding: 10px;
  background-color: #fff;
  color: #111;
  border: 1px solid #111;
    cursor: pointer;
  width: 100%;
  position:relative;
height: 50px;
border-radius: 40px;
font-size:20px;
font-weight:500;
@media (max-width: 1024px){
  position:relative;
  width:80%;
}



`;
const Ask=styled.p`
color: #333;

text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;
const PasswordContainer = styled.div`
position: relative;
width: 100%;
`;



const EyeIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(-50%,-70%);
  cursor: pointer;
  width:20px;
  heghit:20px;
  @media (max-width: 1024px){
    position:relative;
    transform: translate(-60%,40%);


  }
`;
const spin = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
 border: 8px solid #f3f3f3;
 border-top: 8px solid #3498db;
 border-radius: 50%;
 width: 20px;
 height: 20px;
 animation: ${spin} 2s linear infinite;
 margin: auto;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [currentUrl, setCurrentUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  });
  useEffect(() => {
    const checkUrl = setInterval(() => {
     if (typeof window !== 'undefined' && window.location.href !== currentUrl) {
       setCurrentUrl(window.location.href);
       setIsLoading(false);
     }
    }, 100);
    return () => clearInterval(checkUrl);
   }, [currentUrl]);
   
   
   

  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    validate:Login_validate,
    onSubmit,
  })

console.log(formik.errors)
async function handleGoogleSingin(){
  signIn('google',{callbackUrl:process.env.NEXT_PUBLIC_PUBLIC_URL})
}
async function handleFacebooklogin(){
  signIn('facebook',{callbackUrl:process.env.NEXT_PUBLIC_PUBLIC_URL})

}
const handleRegisterClick = () => {
  router.push('/register');
};
 



async function onSubmit(values){
  setIsLoading(true);
  const status = await signIn('credentials',{
   redirect:false,
   email:values.email,
   password:values.password,
   callbackUrl:process.env.NEXT_PUBLIC_PUBLIC_URL,
  }).catch(() => setIsLoading(false)); 
  if(status.ok){
   router.push(status.url);
  } else {
   setIsLoading(false);
  }
 }
 

  
  return (
    <LoginPage>
        <Logo>
            <Image 
             src="/logo-symbol.png" 
             width={70} 
             height={40} 
             alt=""/>
              Brand           
               </Logo>     
        <Container>
          <LoginOption onClick={handleGoogleSingin}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M22.5005 12.7332C22.5005 11.8699 22.4291 11.2399 22.2744 10.5865H12.2148V14.4832H18.1196C18.0006 15.4515 17.3577 16.9099 15.9291 17.8898L15.9091 18.0203L19.0897 20.435L19.3101 20.4565C21.3338 18.6249 22.5005 15.9298 22.5005 12.7332Z" fill="#4285F4"/>
  <path d="M12.214 23C15.1068 23 17.5353 22.0666 19.3092 20.4567L15.9282 17.8899C15.0235 18.5083 13.8092 18.9399 12.214 18.9399C9.38069 18.9399 6.97596 17.1083 6.11874 14.5766L5.99309 14.5871L2.68583 17.0954L2.64258 17.2132C4.40446 20.6433 8.0235 23 12.214 23Z" fill="#34A853"/>
  <path d="M6.12095 14.5767C5.89476 13.9234 5.76386 13.2233 5.76386 12.5C5.76386 11.7767 5.89476 11.0767 6.10905 10.4234L6.10306 10.2842L2.75435 7.7356L2.64478 7.78667C1.91862 9.21002 1.50195 10.8084 1.50195 12.5C1.50195 14.1917 1.91862 15.79 2.64478 17.2133L6.12095 14.5767Z" fill="#FBBC05"/>
  <path d="M12.2141 6.05997C14.2259 6.05997 15.583 6.91163 16.3569 7.62335L19.3807 4.73C17.5236 3.03834 15.1069 2 12.2141 2C8.02353 2 4.40447 4.35665 2.64258 7.78662L6.10686 10.4233C6.97598 7.89166 9.38073 6.05997 12.2141 6.05997Z" fill="#EB4335"/>
</svg>
<p>Continue with Google</p>

          </LoginOption>
          <LoginOption onClick={handleFacebooklogin}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 32 33" fill="none">
  <circle cx="16" cy="16.5" r="14" fill="#0C82EE"/>
  <path d="M21.2137 20.7816L21.8356 16.8301H17.9452V14.267C17.9452 13.1857 18.4877 12.1311 20.2302 12.1311H22V8.76699C22 8.76699 20.3945 8.5 18.8603 8.5C15.6548 8.5 13.5617 10.3929 13.5617 13.8184V16.8301H10V20.7816H13.5617V30.3345C14.2767 30.444 15.0082 30.5 15.7534 30.5C16.4986 30.5 17.2302 30.444 17.9452 30.3345V20.7816H21.2137Z" fill="white"/>
</svg>
<p>Continue with Facebook</p>

          </LoginOption>
          <Or>
            <div></div>
            <p>Or</p>
            <div></div>

          </Or>
   
                <Form onSubmit={formik.handleSubmit}>
        <Input
         id="email"
         name="email"
          type="email"
          placeholder="Email adress"
          {...formik.getFieldProps('email')}

          />
       
       <PasswordContainer>
  <Input
    id="password"
    name="password"
    type={showPassword ? 'text' : 'password'}
    placeholder="Password"
    {...formik.getFieldProps('password')}
  />
  <EyeIcon
    src={showPassword ? '/eye-open-svgrepo-com.svg' : '/eye-close-svgrepo-com.svg'}
    alt={showPassword ? 'Hide Password' : 'Show Password'}
    onClick={togglePasswordVisibility}
  />
</PasswordContainer>

<Button type="submit" >
 {isLoading ? <Loader /> : 'Login'}
</Button>




      </Form>
      <Ask>
      Don’t have an account?

      </Ask>
      <Register onClick={handleRegisterClick}>SignUp</Register>

    </Container>
  
    </LoginPage>
  )
}

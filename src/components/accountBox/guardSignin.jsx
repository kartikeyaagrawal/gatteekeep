import React, { useContext,useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import Axios from'axios';



export function GuardSignin(props) {
  const { switchToSignup,switchToSignin } = useContext(AccountContext);


  const url="/api";
  const [data,setdata]=useState({
    email:"",
    pass:""    
  })

  function handle(e){
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setdata(newdata)
    console.log(newdata);
  }
  function submit(e){

    e.preventDefault();
    console.log("clicked");
    Axios.post("http://localhost:5000/guardLogin",{
      email:data.email,
      password:data.password
    }).catch(e=>{
      console.log(e);
    })
    .then(()=>{
      console.log("Guardlog done");
    })
  }

  return (
    <BoxContainer>
      <FormContainer onSubmit={(e)=>submit(e)}>
        <Input type="email" placeholder="Email" onChange={(e)=>handle(e)} id="email" value={data.email} />
        <Input type="password" placeholder="Password" onChange={(e)=>handle(e)} id="pass" value={data.pass} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton  onClick={submit} type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

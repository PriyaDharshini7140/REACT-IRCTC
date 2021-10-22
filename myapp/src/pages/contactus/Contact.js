import React,{useState} from "react";
import "./style1.css"
import image1 from '../../assets/contactpic.jpg'
import { useForm } from "react-hook-form";
import axios from 'axios';
import BasicModal from "./modals";
export default function Contact() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit, watch, formState: { errors }, reset, trigger, } = useForm();
  const onSubmit = data => {
    handleOpen();
    axios.post("http://localhost:7000/Contact/insertcontact", { data })
  }
  return (
    <div>
     
      <div class="con">
        <div class="container">
          <div class="content">
            <div class="image-box">
              <img class="contactimg" src={image1} alt="" />
            </div>
            <form class="contactform" onSubmit={handleSubmit(onSubmit)}>
              <div class="topic">Send us a message</div>
              <div class="input-box">
                <input type="text" class="textbox" placeholder="Enter Your Name" {...register("name", {
                  required: '*Name is required'
                })} />
                {/* <label>Enter your name</label> */}
              </div>{errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
              <div class="input-box" >
                <input type="text" class="textbox" placeholder="Enter Your Email"  {...register("email", {
                  required: "*Email is Required",

                  pattern: {

                    value: /^[A-Z0-9._%+-]+@[A-Z0-9,-]+\.[A-Z]{2,}$/i,

                    message: '*Email is Invalid'

                  }

                })} />
                {/* <label>Enter your email</label> */}
              </div>{errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
              <div class="message-box">
                {/* <label>Enter your message</label> */}
                <textarea class="msgbox" placeholder="Enter Your Message" {...register("msg", {
                  required: '*Message is required'
                })}></textarea>
              </div>{errors.msg && (
                <small className="text-danger">{errors.msg.message}</small>
              )}
              <div class="input-box">
                {/* <input type="submit" class="submitbutton" value="Send Message" /> */}
               <b className="messagelogo" ><BasicModal  open={open} close={handleClose}/></b>
              </div>
            </form>
          </div>
        </div>
      </div>
    
    </div>
  );
}
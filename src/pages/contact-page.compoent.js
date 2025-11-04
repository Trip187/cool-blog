import { Fragment, useRef } from "react";

const Contact = () => {
  const messageRef = useRef();

  const sendMessageHandler = () => {
    alert(messageRef.current.value);
  };
  return (
    <Fragment>
      <h1> Contact Page</h1>
      <label htmlFor="message">Your Message:</label>
      <textarea rows={5} cols={30} id="message" ref={messageRef}></textarea>
      <button onClick={sendMessageHandler}>Send Message</button>
    </Fragment>
  );
};
export default Contact;

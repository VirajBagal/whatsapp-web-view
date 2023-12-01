import App from "../../App";

const LoginComponent = () => {

  const info = {
    email: "virajbagal12@gmail.com",
    name: "Viraj Bagal",
    imageUrl: "/whatsapp-clone/profile/ayushk.jpeg"
  }

  return <App userInfo={info} />
};
export default LoginComponent;

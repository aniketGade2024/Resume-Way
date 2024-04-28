import "./styles.css";
import AnimatedPlane from "@/assets/AnimationPlane.gif";

const NavBar = () => {
    return (
        <div className="topnav">
            <div className="topnav-left">Resume Way <img src={AnimatedPlane} alt="Animated Plane"/></div>
            <div>
                <a href="#Login">Login</a>
                <a href="#Sign Up">Sign Up</a>
            </div>
        </div>
    )
}
export default NavBar
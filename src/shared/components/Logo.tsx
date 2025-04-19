import { Link } from "react-router-dom";
import logo from "../../assets/logos/ipro-logo.png";

function Logo() {
	return (
		<Link to="/" className="inline-block border-1 border-white">
			<img src={logo} alt="App Logo" className="h-auto max-w-full transition-all duration-200" />
		</Link>
	);
}
export { Logo };

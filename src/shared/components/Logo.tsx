import { Link } from "react-router-dom";
import logo from "../../assets/logos/ipro-logo.png";

export default function Logo() {
	return (
		<Link to="/" className="inline-block">
			<img src={logo} alt="App Logo" className="h-8 sm:h-10 md:h-12 w-auto transition-all duration-200" />
		</Link>
	);
}

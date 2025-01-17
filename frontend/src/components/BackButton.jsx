import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const BackButton = ({ destination = '/'}) => {
    return(
        <div className="flex">
            <Link
            to={destination}
            className="flex items-center bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-200">
                <BsArrowLeft className="text-2xl mr-2"/>
                Back
            </Link>
        </div>
    )
}

export default BackButton;
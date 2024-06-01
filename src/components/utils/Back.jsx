import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAnglesLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Back({ to,state=null }) {
  return (
    <Link to={to} state={state} className="text-white rounded-circle bg-primary d-center " style={{height:'45px',width:'45px'}}>
      <FaAnglesLeft size={"32px"} />
    </Link>
  );
}

export default Back;

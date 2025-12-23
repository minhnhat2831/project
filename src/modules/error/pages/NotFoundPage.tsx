import { Link } from "react-router"
import pic from "@/assets/warning.jpg"
export default function NotFoundPage() {
    return (<>
        <div className="text-center mt-20">
            <p className="text-red-500 text-7xl">Error 404</p>
            <p>Sorry we can't found this page</p>
            <img src={pic} alt="warning sign" className="m-auto mb-5"></img>
            <Link to="/admin" className="text-2xl text-blue-600">Go Home</Link>
        </div>
    </>)
}
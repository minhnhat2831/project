import pic from "@/assets/warning.jpg"

export default function Information(){
    return(<>
        <div className="px-5">
            <p className="mb-4">Pictures of service</p>
            <img className="mb-24" src={pic} alt="pic" width={150} height={150}></img>
        </div>
        <div className="px-5 h-30">
            <p className="font-bold mb-2">Services</p>
            <div className="rounded-full w-fit mb-2 bg-gray-200 px-3">Health care</div>
        </div>
        <div className="px-5">
            <p className="font-bold mb-2">Qualifications</p>
            <p>No qualification</p>
        </div>
    </>)
}
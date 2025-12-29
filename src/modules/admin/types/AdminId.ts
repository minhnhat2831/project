export interface AdminIdResponse {
    message : string,
    data : AdminId
}

export interface AdminId {
    id : string,
    username : string,
    firstName : string,
    lastName : string,
    role : string,
    status : "active" | "inactive",
    email : string,
    picture : string,
    createdAt : string,
    updatedAt : string | null,
    picture2 : {
        id : string,
        uri : string,
        type : string,
        metadata : string | null,
        createdAt : string
    }
}
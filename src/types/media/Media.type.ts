export interface MediaUrlRequest {
    type : string
}

export interface MediaUrlResponse {
    message : string,
    data : Media
}

export interface Media {
    url : string,
        fields : {
            acl : string,
            success_action_status : number,
            bucket : string,
            "X-Amz-Algorithm" : string,
            "X-Amz-Credential" : string,
            "X-Amz-Date" : string,
            Policy : string,
            "X-Amz-Signature" : string,
            key : string
        }
}
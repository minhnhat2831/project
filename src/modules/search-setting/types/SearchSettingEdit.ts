export interface SearchSettingEditRequest {
    keyword : string,
    count : number,
    isSuggestion : boolean
}

export interface SearchSettingEditResponse {
    message : string,
    data : {
        id? : string,
        count? : number,
        isSuggestion? : boolean,
        createdAt? : string,
        updatedAt? : string | null
    }
}
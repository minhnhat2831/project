export interface SearchSettingCreateRequest {
    keyword : string,
    count : number,
    isSuggestion : boolean
}

export interface SearchSettingCreateResponse {
    data : boolean,
    message : string
}
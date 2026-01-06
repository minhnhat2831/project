export interface SearchSettingParams {
    search? : string | null,
    page? : number | null,
    limit? : number | null,
    offset? : number | null,
    sort? : string | null
}

export interface SearchSettingResponse {
    message : string,
    data : SearchSetting[],
    metadata : {
        page : number,
        limit : number,
        totalPages : number,
        totalCount : number,
        hasNextPage : boolean
    }
}

export interface SearchSetting {
    id : string,
    keyword? : string,
    count? : number,
    isSuggestion? : boolean,
    createdAt? : string,
    updatedAt? : string | null
}
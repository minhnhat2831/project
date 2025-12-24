export interface DoulaReviewParams {
    offset?: string,
    limit?: number,
    page?: number,
    f_doulaId?: string
}

export interface DoulaReviewResponse {
    message: string,
    data: DoulaReview[],
    metadata: {
        page: number,
        limit: number,
        totalPages: number,
        totalCount: number,
        hasNextPage: boolean
    }
}

export interface DoulaReview {
    id: string | null,
    doulaId: string | null,
    userId: string | null,
    comment: string | null,
    start: number | null,
    expertiseStar: number | null,
    communicationStar: number | null,
    punctualityStar: number | null,
    supportStar: number | null,
    createdAt: string | null,
    updatedAt: string | null,
    user: {
        fullName: string | null,
        firstName: string | null,
        middleName: string | null,
        lastName: string | null,
        picture: string | null
    }
}
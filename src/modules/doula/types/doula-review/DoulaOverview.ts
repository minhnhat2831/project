export interface DoulaOverviewParams {
    doulaId: string
}

export interface DoulaOverviewResponse {
    message: string,
    data: DoulaOverview
}

export interface DoulaOverview {
    id: string | null,
    title: string | null,
    description: string | null,
    businessName: string | null,
    starAvg: number | null,
    status: "active" | "inactive",
    qualifications: [string],
    stripeCustomerId: string | null,
    isTrialed: boolean,
    createdAt: string | null,
    updatedAt: string | null,
    avgStart: string | null,
    avgExpertiseStar: string | null,
    avgCommunicationStar: string | null,
    avgPunctualityStar: string | null,
    avgSupportStar: string | null,
    totalReview: number | null
}
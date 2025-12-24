export interface GetDoulaSubscriptionsId {
    message: string,
    data: DoulaSubscriptions
}

export interface DoulaSubscriptions {
    id: string,
    subscriptionPlanName: string,
    endTime: string | null,
    status: "active" | "cancelled",
    createdAt: string,
    subscription: {
        id: string,
        name: string,
        description: string,
        price: [
            {
                name: string,
                amount: number,
                count: number,
                interval: string,
                description: string
            }
        ]
    },
    price: {
        name: string,
        amount: number,
        count: number,
        interval: string,
        description: string
    },
    nextBillingDate: Date | null
}
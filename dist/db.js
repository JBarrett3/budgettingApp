export const db = {
    users: [
        {
            id: 1,
            name: 'George Washington',
            finId: 1,
            accntIds: [1]
        },
        {
            id: 2,
            name: 'John Adams',
            authId: 1
        },
        {
            id: 3,
            name: 'Thomas Jefferson',
            authId: 2,
            finId: 2
        },
        {
            id: 4,
            name: 'James Madison',
            accntIds: [2, 3]
        }
    ],
    auths: [
        {
            id: 1,
            userId: 2,
            username: 'jAdams1797',
            password: 'americaRules'
        },
        {
            id: 2,
            userId: 3,
            username: 'tJeff1801',
            password: 'americaRules'
        }
    ],
    finances: [
        {
            id: 1,
            userId: 1,
            desiredSavingsPercentage: 0.3,
            salary: 50
        },
        {
            id: 2,
            userId: 3,
            desiredSavingsPercentage: 0.7,
            salary: 100
        }
    ],
    accounts: [
        {
            id: 1,
            userId: 1,
            holding: 70,
            interestRate: 0.05
        },
        {
            id: 2,
            userId: 4,
            holding: 50,
            interestRate: 0.15
        },
        {
            id: 3,
            userId: 4,
            holding: 30,
            interestRate: 0.01
        }
    ]
};

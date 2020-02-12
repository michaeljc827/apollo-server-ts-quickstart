const PRIVATE_KEY = "MrKrabsB3eBo0pBo0p";

import { IResolvers } from 'graphql-tools';
var jwt = require('jsonwebtoken');


const resolverMap: IResolvers = {
    Query: {
        users: (parent, args, context) => {
            return context.prisma.users();
        },
        me: (parent, args, context) => {

            let decoded;

            try {
                decoded = jwt.verify(args.token, PRIVATE_KEY);
            }
            catch (e) {
                return null;
            }

            const { userId } = decoded;

            console.log(decoded);


            return context.prisma.user({
                id: userId
            });
        }
    },
    Mutation: {
        createUser: async (parent, args, context) => {
            try {
                const { name, email, password } = args;

                const user = await context.prisma.createUser({
                    name, email, password
                });

                return user;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        },
        login: async (parent, args, context) => {
            const user = await context.prisma.user({
                email: args.email
            });

            let passwordValidated = false;

            if (user) {
                if (user.password === args.password) {
                    passwordValidated = true;
                }
                if (passwordValidated) {
                    const token = jwt.sign({ userId: user.id }, PRIVATE_KEY);
                    return {
                        token
                    }
                }
            }
            return null;
        },
    }
};
export default resolverMap;
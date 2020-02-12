const PRIVATE_KEY = "MrKrabsB3eBo0pBo0p";

import { IResolvers } from 'graphql-tools';
var jwt = require('jsonwebtoken');


const resolverMap: IResolvers = {
    Query: {
        users: (parent, args, context) => {
            return context.prisma.users();
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
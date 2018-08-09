import { User, UserClaim, UserLogin, UserProfile } from 'data/models';

export const queries = [
  // Retrieves information about the currently logged-in user
  `databaseGetLoggedInUser: DatabaseUser`
];

export const resolvers = {
  RootQuery: {
    async databaseGetLoggedInUser(parent, args, context) {
      // Throw error if user is not authenticated
      if (!context.user) {
        return null;
      }

      // Find logged in user from database
      const dbUser = await User.findOne({
        where: { email: context.user.email },
        include: [
          { model: UserLogin, as: 'logins' },
          { model: UserClaim, as: 'claims' },
          { model: UserProfile, as: 'profile' }
        ]
      });

      return dbUser;
    }
  }
};

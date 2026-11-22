export const authKeys = {
  all: ['auth'],
  me: () => ['auth', 'me'],
  permissions: () => ['auth', 'permissions'],
}
export const userKeys = {
  all: ['users'],
  lists: () => ['users', 'list'],
  list: (params) => ['users', 'list', params],
  // 'roles' > 'list' prefix ke andar hai, isliye roles me add/edit/delete hone par ye apne aap refresh ho jata hai
  roleOptions: () => ['roles', 'list', 'options'],
}
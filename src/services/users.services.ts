import api from './api.service';
import { User } from "../types"

const getHash = async (password: string) => {
  const bcrypt = require("bcryptjs");
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash
}

const usersService = {
  async getAll() {
    return api.get<User[]>("/users?_sort=name&_order=asc&_expand=group")
  },

  async getById(id: number) {
    return api.get<User>(`/users/${id}?_expand=group`)
  },

  async getByEmail(email: string) {
    return api.get<User[]>(`/users?email=${email}&_expand=group`)
  },

  async create(user: User) {
    user = {...user, created_at: new Date()}
    user.password = await getHash(user.password)
    return api.post<User>(`/users`, user)
  },

  async update(user: User) {
    user.password = await getHash(user.password)
    return api.patch<User>(`/users/${user.id}`, user)
  },

  async delete(id: number) {
    return api.delete<User>(`/users/${id}`)
  }
}

export default usersService;
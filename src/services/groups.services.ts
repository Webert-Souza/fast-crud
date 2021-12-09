import api from './api.service';
import { Group } from "../types"

const groupsService = {
  async getAll() {
    return api.get<Group[]>("/groups?_sort=name&_order=asc&_embed=users")
  },

  async getById(id: number) {
    return api.get<Group>(`/groups/${id}?_embed=users`)
  },
}

export default groupsService;
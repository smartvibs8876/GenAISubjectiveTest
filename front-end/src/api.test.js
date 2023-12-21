import axios from 'axios';
import { getUsers } from './api';

jest.mock('axios');

it('fetches users', async () => {
  const users = [{id: 1}];
  axios.get.mockResolvedValueOnce({ data: users});
  
  const result = await getUsers();
  expect(result).toEqual(users);
  expect(axios.get).toHaveBeenCalledWith('/users');
});
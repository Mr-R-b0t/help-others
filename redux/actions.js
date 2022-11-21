import {user} from './constants';

export function setUser(user) {
  return {
    type: user,
    payload: user,
  };
}

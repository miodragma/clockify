import axiosConfig from '../../../axios/axiosConfig';
import { userActions } from './user-slice';
import { loaderActions } from '../../UI/store/loader/loader-slice';

export const fetchUserData = () => {
  return async dispatch => {
    dispatch(loaderActions.setLoaderData(true));
    const fetchUser = async () => {
      return axiosConfig('/user');
    }

    try {
      const userData = await fetchUser();
      dispatch(userActions.setUserData(userData.data))
      dispatch(loaderActions.setLoaderData(false));
    } catch (error) {
      dispatch(loaderActions.setLoaderData(false));
      console.log(error)
    }
  }
}

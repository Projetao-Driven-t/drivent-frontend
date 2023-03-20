import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';
import useAsync from '../useAsync';

export default function usePostSubscription() {
  const token = useToken();

  const {
    loading: subscriptionLoading,
    error: subscriptionError,
    act: postActivity,
  } = useAsync((data) => activityApi.postActivity(data, token), false);

  return {
    subscriptionLoading,
    subscriptionError,
    postActivity,
  };
}

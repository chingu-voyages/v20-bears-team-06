import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PROFILE} from "./Queries";
import { SET_SEEN_MUTATION } from "./Mutations";
import { GET_ME } from "./Queries";

export async function useProfile(userId) {
  const { data = null, loading } = useQuery(GET_PROFILE, {
    variables: { userId: userId },
  });

  if (!loading) {
    if (data && data.user) {
      return data.user;
    }
  }
}

export function useSetSeen(notifications) {
  const { data, loading } = useMutation(SET_SEEN_MUTATION, {
    variables: { notificationIds: notifications },
  });

  if (!loading && data.setSeen) {
    return data.setSeen;
  }
}

// src/hooks/useAuth.tsx

export function useAuth() {
  const { data } = useQuery(GET_ME);

  return {
    loggedIn: data && data.me,
    id: data ? data.id : null,
    firstName: data ? data.firstName : null,
    name: data ? data.name : null,
  };
}

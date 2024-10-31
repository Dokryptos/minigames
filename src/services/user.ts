import queryKeys from '@/constants/query-keys';
import { User } from '@/types/user';
import { queryClient } from '@/utils/query-client';
import request from '@/utils/request';

interface UserResponse {
  accessToken: string;
  email: string;
  id: string;
  needInfo?: boolean;
}

class UserService {
  /**
   * Send an email to the user to reset his password
   */
  async forgotPassword(email: string) {
    await request(`/users/forgot_password`, {
      method: 'POST',
      data: { email: email.toLowerCase() },
    });
  }

  /**
   * Get the current user
   */
  async get() {
    return queryClient.fetchQuery({
      queryKey: queryKeys.user(),
      queryFn: () => request<User>(`/users/me`),
      staleTime: 1000 * 60 * 5,
    });
  }

  /**
   * Login the user
   */
  async login(payload: { email: string; password: string }) {
    const { email, password } = payload;

    const res = await request<UserResponse>(`/auth/login`, {
      method: 'POST',
      data: { email, password },
    });

    return res;
  }

  /**
   * Get a new access token for an identified user
   */
  async refreshToken() {
    const res = await request<UserResponse>(`/auth/refresh_token`, {
      method: 'GET',
    });

    return res;
  }

  /**
   * Register the user
   */
  async register(payload: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    /**
     * The number of users playing
     */
    detectiveCount: number;
    /**
     * The mean age of the user's playing the game
     */
    ageMean: string;
    mailOptIn: boolean;
  }) {
    const { name, email, phoneNumber, password, detectiveCount, ageMean, mailOptIn } = payload;

    const res = await request<UserResponse>(`/users`, {
      method: 'POST',
      data: { name, email, phoneNumber, password, detectiveCount, ageMean, mailOptIn },
    });

    return res;
  }

  /**
   * Reset the user's password
   *
   * @param payload - The password and token
   * @param payload.token - The token to reset the password, it's sent by email and get from the URL in a "token" query parameter
   */
  async resetPassword(payload: { token: string; password: string }) {
    const { password, token } = payload;

    const res = await request<UserResponse>(`/users/password`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      method: 'PUT',
      data: { password },
    });

    return res;
  }

  /**
   * Update the user's information
   */
  async update(
    payload: Partial<
      Pick<User, 'name' | 'email' | 'phoneNumber' | 'detectiveCount' | 'ageMean' | 'mailOptIn'>
    > & { password?: string }
  ) {
    const { name, email, phoneNumber, password, detectiveCount, ageMean, mailOptIn } = payload;

    const res = await request<User>(`/users/me`, {
      method: 'PUT',
      data: { name, email, phoneNumber, password, detectiveCount, ageMean, mailOptIn },
    });

    queryClient.setQueryData(queryKeys.user(), res);

    return res;
  }
}

export const userService = new UserService();

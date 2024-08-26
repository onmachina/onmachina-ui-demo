import { NearAuthClient } from '@onmachina/nearauth-sdk-wallet';

interface User {
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  emailVerified: boolean;
  hasSubscription: boolean;
  accessToken: {
    value: string | null;
    expiresAt: number | null;
  };
}

class AuthAdapter {
  private authClient: NearAuthClient | null = null;
  private readonly NEARAUTH_URL: string;
  private readonly NEAR_NETWORK_ID: string;

  constructor() {
    this.NEARAUTH_URL = import.meta.env.VITE_NEARAUTH_URL;
    this.NEAR_NETWORK_ID = import.meta.env.VITE_NEAR_NETWORK_ID;
    this.initAuthClient();
  }

  private async initAuthClient(): Promise<void> {
    this.authClient = new NearAuthClient({
      baseUrl: this.NEARAUTH_URL,
      nearNetworkId: this.NEAR_NETWORK_ID,
    });
  }

  private async getAuthClient(): Promise<any> {
    if (!this.authClient) {
      await this.initAuthClient();
    }
    return this.authClient!;
  }

  getAuthType(): 'near' {
    return 'near';
  }

  async isAuthenticated(): Promise<boolean> {
    const auth = await this.getAuthClient();
    console.log('checking if authenticated');
    return auth.isAuthenticated();
  }

  async startAuth(): Promise<void> {
    const auth = await this.getAuthClient();
    await auth.loginWithRedirect();
  }

  async finishAuth(request: Request): Promise<void> {
    const auth = await this.getAuthClient();
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('session_id') ?? undefined; // After Stripe checkout.
    const accountId = url.searchParams.get('account_id') ?? undefined; // After NEAR Wallet Selector.
    await auth.handleRedirect(accountId, sessionId);
  }

  async logout(): Promise<void> {
    const auth = await this.getAuthClient();
    await auth.logout();
  }

  async getUser(): Promise<User> {
    const auth = await this.getAuthClient();
    const user = await auth.getUser();
    const accessToken = await auth.getTokenSilently({ cacheMode: 'on' });
    return {
      name: user?.email || null,
      email: user?.email || null,
      avatarUrl: user?.picture || null,
      emailVerified: user?.email_verified || false,
      hasSubscription: user?.['has_subscription'] || false,
      accessToken: {
        value: accessToken || null,
        expiresAt: user?.access_token_expires_at || null,
      },
    } as User;
  }

  async refreshToken(): Promise<void> {
    const auth = await this.getAuthClient();
    await auth.loginWithRedirect();
  }

  async postCheckoutUrl(): Promise<string> {
    const state = await this.getState();
    return `https://${this.AUTH0_DOMAIN}/continue?state=${state}`;
  }

  async startSignup(): Promise<void> {
    const auth = await this.getAuthClient();
    await auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${this.BASE_URL}/finish-auth`,
        screen_hint: 'signup',
      },
    });
  }

  async startCheckout(): Promise<void> {
    return;
  }

  async finishCheckout(request: Request): Promise<void> {
    const auth = await this.getAuthClient();
    const url = new URL(request.url);
    const stripe_session_id = url.searchParams.get('session_id');
    await auth.handleRedirect(stripe_session_id);
  }
}

export const authAdapter = new AuthAdapter();

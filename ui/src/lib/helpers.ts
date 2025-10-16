import type { TenantData } from '@/components';

import type { Tenant, ProfileData } from './api';
import type { UserData } from '@/stores';

export function toTenantData(tenant: Tenant): TenantData {
  return {
    name: tenant.name,
    flag: 'us', // Placeholder, replace with actual flag data if available
    locality: tenant.environment.short_name,
    loginUrl: tenant.login_url,
  };
}

export function toUserData(profile: ProfileData): UserData {
  return {
    id: profile.sub,
    email: profile.email,
    name: profile.name,
    profilePicture: profile.picture,
    // TODO: Update profileUrl to be dynamic based on tenant and locality
    profileUrl: `/profile/${profile.sub}`,
  };
}

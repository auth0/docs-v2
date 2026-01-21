import type { TenantData } from '@/components';

import type { Tenant, ProfileData } from './api';
import type { UserData } from '@/stores';

export function localityIdToFlag(localityId: string): TenantData['flag'] {
  // Map locality IDs to flag codes
  const mapping: Record<string, TenantData['flag']> = {
    us: 'us',
    sus: 'us',
    tus: 'us',
    local: 'us',
    eu: 'eu',
    teu: 'eu',
    au: 'australia',
    jp: 'japan',
    uk: 'uk',
    ca: 'canada',
  };

  return mapping[localityId] || 'globe';
}

export function toTenantData(tenant: Tenant): TenantData {
  return {
    name: tenant.name,
    flag: localityIdToFlag(tenant.locality.id),
    locality: tenant.locality.id,
    loginUrl: tenant.login_url,
    domain: `${tenant.name}.${tenant.environment.apex}`
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

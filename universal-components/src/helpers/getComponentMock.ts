import {
  getDomainManagementMock,
  getSsoProviderCreateMock,
  getSsoProviderEditMock,
  getSsoProviderTableMock,
  getOrganizationDetailsEditLMock,
  getUserMfaManagementMock,
} from "@/mocks";

// Map component names to their mock logic generators
const mockLogicRegistry: Record<string, () => unknown> = {
  "domain-table-view": getDomainManagementMock,
  "sso-provider-create": getSsoProviderCreateMock,
  "sso-provider-edit": getSsoProviderEditMock,
  "sso-provider-table": getSsoProviderTableMock,
  "organization-details-edit": getOrganizationDetailsEditLMock,
  "user-mfa-management": getUserMfaManagementMock,
};

export function getComponentMock(componentName: string) {
  const logicFn = mockLogicRegistry[componentName];
  if (!logicFn) {
    console.warn(`No mock logic found for "${componentName}"`);
    return { logic: {}, handlers: {} };
  }
  return logicFn();
}

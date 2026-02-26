import { getDomainManagementLogic } from "./domain-table-mock";

// Map component names to their mock logic generators
const mockLogicRegistry: Record<string, () => unknown> = {
  "domain-table-view": getDomainManagementLogic,
};

export function getMockLogic(componentName: string) {
  const logicFn = mockLogicRegistry[componentName];
  if (!logicFn) {
    console.warn(`No mock logic found for "${componentName}"`);
    return { logic: {}, handlers: {} };
  }
  return logicFn();
}

export { getDomainManagementLogic };

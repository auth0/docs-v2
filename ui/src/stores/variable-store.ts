import {
  action,
  autorun,
  makeObservable,
  observable,
  type IReactionDisposer,
} from 'mobx';
import type { RootStore } from './root-store';

const defaultValues = [
  '{yourAppName}',
  '{userName}',
  '{yourTenant}',
  '{yourDomain}',
  '{yourClientId}',
  '{yourClientSecret}',
  '{https://yourApp/callback}',
  '{yourApiIdentifier}',
  '{yourConnectionName}',
] as const;

type AllowedKeys = (typeof defaultValues)[number];

export class VariableStore {
  rootStore: RootStore;

  values = observable.map<AllowedKeys, string>(
    defaultValues.map((value) => [value, value]),
  );

  #disposers: IReactionDisposer[] = [];

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      init: action,
      setValue: action,
      reset: action,
    });
    this.rootStore = rootStore;
  }

  init() {
    // dispose all subscriptions before re-subscribing them
    for (const disposer of this.#disposers) {
      disposer();
    }

    this.#initAuthVariables();
    this.#initClientVariables();
    this.#initResourceServerVariables();
  }

  getValue(key: AllowedKeys) {
    if (!this.values.has(key)) {
      console.warn(`${key} is not allowed in VariableStore`);
    }
    return this.values.get(key) ?? key;
  }

  setValue(key: AllowedKeys, value: string) {
    if (!this.values.has(key)) {
      console.warn(`${key} is not allowed in VariableStore`);
      return;
    }

    this.values.set(key, value);
  }

  resetKey(key: AllowedKeys) {
    if (!this.values.has(key)) {
      console.warn(`${key} is not allowed in VariableStore`);
      return;
    }

    this.values.set(key, key);
  }

  reset() {
    for (const key of defaultValues) {
      this.values.set(key, key);
    }
  }

  #initAuthVariables() {
    const disposer = autorun(() => {
      const { user, domain, selectedTenant } = this.rootStore.sessionStore;

      if (user) {
        this.setValue('{userName}', user.name);
      } else {
        this.resetKey('{userName}');
      }

      if (domain) {
        this.setValue('{yourDomain}', domain);
      } else {
        this.resetKey('{yourDomain}');
      }

      if (selectedTenant) {
        this.setValue('{yourTenant}', selectedTenant.name);
      } else {
        this.resetKey('{yourTenant}');
      }
    });

    this.#disposers.push(disposer);
  }

  #initClientVariables() {
    const disposer = autorun(() => {
      const { selectedClient } = this.rootStore.clientStore;

      if (selectedClient) {
        this.setValue('{yourAppName}', selectedClient.name);
        this.setValue('{yourClientId}', selectedClient.client_id);
        this.setValue(
          '{yourClientSecret}',
          selectedClient.client_secret ?? '{yourClientSecret}',
        );
        this.setValue(
          '{https://yourApp/callback}',
          selectedClient.callbacks?.[0] ?? '{https://yourApp/callback}',
        );
        return;
      }

      // reset keys to default values
      this.resetKey('{yourAppName}');
      this.resetKey('{yourClientId}');
      this.resetKey('{yourClientSecret}');
      this.resetKey('{https://yourApp/callback}');
    });

    this.#disposers.push(disposer);
  }

  #initResourceServerVariables() {
    const disposer = autorun(() => {
      const { selectedApi } = this.rootStore.resourceServerStore;

      if (selectedApi) {
        this.setValue('{yourApiIdentifier}', selectedApi.identifier);
      } else {
        this.resetKey('{yourApiIdentifier}');
      }
    });

    this.#disposers.push(disposer);
  }
}

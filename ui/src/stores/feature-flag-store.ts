import { action, makeAutoObservable } from 'mobx';

import { getFeatureFlags } from '@/lib/api';

import type { RootStore } from './root-store';

export class FeatureFlagStore {
  rootStore: RootStore;
  flags: Record<string, boolean> = {};

  #intervalId: number | null = null;
  #isInitialized: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      init: action,
      reset: action,
      fetchFlags: action,
    });
    this.rootStore = rootStore;
  }

  async init() {
    if (this.#isInitialized) return;

    try {
      await this.fetchFlags();
      this.startPolling();
      this.#isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize FeatureFlagStore:', error);
      // Continue without flags rather than throwing
    }
  }

  private startPolling() {
    this.#intervalId = window.setInterval(() => {
      this.fetchFlags().catch((error) => {
        console.error('Failed to fetch feature flags:', error);
        // Keep existing flags on error
      });
    }, 60000); // 60 seconds
  }

  async fetchFlags() {
    try {
      const flags = await getFeatureFlags();
      this.flags = flags; // Atomic update
    } catch (error) {
      console.error('Feature flags API error:', error);
      // Preserve existing flags on error
      throw error;
    }
  }

  // Public API methods
  isEnabled(featureName: string): boolean {
    return this.flags[featureName] ?? false;
  }

  getFlag(featureName: string): boolean | undefined {
    return this.flags[featureName];
  }

  getAllFlags(): Record<string, boolean> {
    return { ...this.flags }; // Return copy
  }

  async refresh() {
    await this.fetchFlags();
  }

  reset() {
    if (this.#intervalId !== null) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
    this.flags = {};
    this.#isInitialized = false;
  }
}

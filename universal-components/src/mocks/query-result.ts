/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * `mockRefetch(getData)` builds a settled success result around the current
 * data, so previews can call `refetchX()` safely.
 */
export const mockQueryResult = <T>(data: T) => ({
  data,
  error: null,
  isError: false as const,
  isPending: false as const,
  isLoading: false as const,
  isLoadingError: false as const,
  isRefetchError: false as const,
  isSuccess: true as const,
  isPlaceholderData: false as const,
  status: 'success' as const,
  fetchStatus: 'idle' as const,
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isEnabled: true,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isInitialLoading: false,
  isPaused: false,
  isRefetching: false,
  isStale: false,
  promise: Promise.resolve(data),
  refetch: async () => mockQueryResult(data),
});

/** Builds a `refetch` that resolves the current data as a success result. */
export const mockRefetch =
  <T>(getData: () => T) =>
  async () =>
    mockQueryResult(getData()) as any;

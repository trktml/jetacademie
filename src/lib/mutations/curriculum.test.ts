import { describe, expect, it } from "bun:test";
import { getQueryClient } from "@/lib/query-client";
import { curriculumProgressKey, type CurriculumProgressData } from "@/lib/queries/curriculum";
import { curriculumProgressMutationOptions } from "./curriculum";
const initial: CurriculumProgressData = {
  userId: "owner",
  isSignedIn: true,
  gender: null,
  completedEntryIds: [],
};
const input = { kind: "completion" as const, entryId: "canonical-entry", completed: true };

describe("account progress mutations", () => {
  it("updates the canonical cache and preserves unrelated preferences", async () => {
    const client = getQueryClient();
    const key = curriculumProgressKey("owner");
    client.setQueryData(key, { ...initial, gender: "bayan" });
    const options = curriculumProgressMutationOptions(client, "owner");
    const mutation = client.getMutationCache().build(client, {
      ...options,
      mutationFn: async () => ({ ...input, userId: "owner" }),
    });
    await mutation.execute(input);
    expect(client.getQueryData(key)).toEqual({
      ...initial,
      gender: "bayan",
      completedEntryIds: ["canonical-entry"],
    });
    expect(client.getQueryState(key)?.isInvalidated).toBe(true);
    client.clear();
  });
  it("does not restore private cache after sign-out while a request is pending", async () => {
    const client = getQueryClient();
    const key = curriculumProgressKey("owner");
    client.setQueryData(key, initial);
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const options = curriculumProgressMutationOptions(client, "owner");
    const mutation = client.getMutationCache().build(client, {
      ...options,
      mutationFn: async () => {
        await gate;
        return { ...input, userId: "owner" };
      },
    });
    const pending = mutation.execute(input);
    client.removeQueries({ queryKey: key });
    client.setQueryData(curriculumProgressKey("new-owner"), { ...initial, userId: "new-owner" });
    release();
    await pending;
    expect(client.getQueryData(key)).toBeUndefined();
    expect(
      client.getQueryData<CurriculumProgressData>(curriculumProgressKey("new-owner"))
        ?.completedEntryIds
    ).toEqual([]);
    client.clear();
  });
  it("ignores a mutation response belonging to another account", async () => {
    const client = getQueryClient();
    const key = curriculumProgressKey("owner");
    client.setQueryData(key, initial);
    const options = curriculumProgressMutationOptions(client, "owner");
    const mutation = client
      .getMutationCache()
      .build(client, { ...options, mutationFn: async () => ({ ...input, userId: "other-owner" }) });
    await mutation.execute(input);
    expect(client.getQueryData(key)).toEqual(initial);
    client.clear();
  });
  it("cancels an in-flight stale read before applying a confirmed mutation", async () => {
    const client = getQueryClient();
    const key = curriculumProgressKey("owner");
    client.setQueryData(key, initial);
    let signal: AbortSignal | undefined;
    const staleRead = client
      .fetchQuery({
        queryKey: key,
        staleTime: 0,
        queryFn: ({ signal: current }) => {
          signal = current;
          return new Promise<CurriculumProgressData>(() => {});
        },
      })
      .catch(() => {});
    const options = curriculumProgressMutationOptions(client, "owner");
    const mutation = client
      .getMutationCache()
      .build(client, { ...options, mutationFn: async () => ({ ...input, userId: "owner" }) });
    await mutation.execute(input);
    await staleRead;
    expect(signal?.aborted).toBe(true);
    expect(client.getQueryData<CurriculumProgressData>(key)?.completedEntryIds).toEqual([
      "canonical-entry",
    ]);
    client.clear();
  });
});

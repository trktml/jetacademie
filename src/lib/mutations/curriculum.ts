import { mutationOptions, type QueryClient } from "@tanstack/react-query";
import { unwrapActionResult } from "@/lib/action-result";
import { markEntryAsRead, unmarkEntryAsRead } from "@/app/mufredat/actions";
import { updateUserGender } from "@/app/mufredat/gender-actions";
import { curriculumProgressKey, type CurriculumProgressData } from "@/lib/queries/curriculum";
import type { Gender } from "@/lib/data/ilmihal-curriculum";

type ProgressMutation =
  { kind: "completion"; entryId: string; completed: boolean } | { kind: "gender"; gender: Gender };

export function curriculumProgressMutationOptions(queryClient: QueryClient, userId: string | null) {
  const queryKey = curriculumProgressKey(userId);
  return mutationOptions({
    mutationKey: ["update-curriculum-progress", userId],
    scope: { id: `curriculum-progress:${userId}` },
    retry: false,
    mutationFn: async (input: ProgressMutation) => {
      if (!userId) throw new Error("Oturum bulunamadı.");
      if (input.kind === "gender") {
        const result = unwrapActionResult(await updateUserGender(input.gender, userId));
        return { ...input, userId: result.userId };
      }
      const action = input.completed ? markEntryAsRead : unmarkEntryAsRead;
      const result = unwrapActionResult(await action(input.entryId, userId));
      return { ...input, entryId: result.entryId, userId: result.userId };
    },
    onMutate: () => queryClient.cancelQueries({ queryKey, exact: true }),
    onSuccess: async (result) => {
      if (result.userId !== userId) return;
      // A refetch can have started while the server action was pending.
      await queryClient.cancelQueries({ queryKey, exact: true });
      queryClient.setQueryData<CurriculumProgressData>(queryKey, (previous) => {
        // Never recreate private data after sign-out removed the owning query.
        if (!previous || previous.userId !== result.userId) return previous;
        if (result.kind === "gender") return { ...previous, gender: result.gender };
        const ids = new Set(previous.completedEntryIds);
        if (result.completed) ids.add(result.entryId);
        else ids.delete(result.entryId);
        return { ...previous, completedEntryIds: [...ids] };
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey, exact: true }),
  });
}

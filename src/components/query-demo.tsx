"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHealth, healthQueryOptions } from "@/lib/queries/health";

export function QueryDemo() {
  const queryClient = useQueryClient();

  const { data, error, isPending, isFetching, isStale, dataUpdatedAt, refetch } =
    useQuery(healthQueryOptions);

  const pingMutation = useMutation({
    mutationFn: fetchHealth,
    onSuccess: () => {
      // Invalidate health query to demonstrate cache synchronization
      queryClient.invalidateQueries({ queryKey: ["health"] });
    },
  });

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">TanStack Query Demo</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Sunucu durumu yönetimi ve önbellek (Server-state caching)
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isPending
              ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
              : error
                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
          }`}
        >
          {isPending ? "Yükleniyor" : error ? "Hata" : "API: " + (data?.status ?? "Bilinmiyor")}
        </span>
      </div>

      <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3.5 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="font-medium text-zinc-500 dark:text-zinc-400">Önbellek Durumu:</span>{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {isStale ? "Bayat (Stale)" : "Taze (Fresh)"}
            </span>
          </div>
          <div>
            <span className="font-medium text-zinc-500 dark:text-zinc-400">Arka Plan İsteği:</span>{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {isFetching ? "Aktif..." : "Boşta (Idle)"}
            </span>
          </div>
          <div className="col-span-2 truncate">
            <span className="font-medium text-zinc-500 dark:text-zinc-400">Sunucu Zamanı:</span>{" "}
            <span suppressHydrationWarning className="font-mono text-zinc-800 dark:text-zinc-200">
              {data?.timestamp ? new Date(data.timestamp).toLocaleString() : "Alınıyor..."}
            </span>
          </div>
          <div className="col-span-2">
            <span className="font-medium text-zinc-500 dark:text-zinc-400">Son Güncelleme:</span>{" "}
            <span suppressHydrationWarning className="font-mono text-zinc-800 dark:text-zinc-200">
              {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "-"}
            </span>
          </div>
        </div>

        {error && (
          <p className="mt-2 text-rose-500">
            Sorgu Hatası: {error instanceof Error ? error.message : "Bilinmeyen hata"}
          </p>
        )}

        {pingMutation.error && (
          <p className="mt-2 text-rose-500">
            Mutasyon Hatası:{" "}
            {pingMutation.error instanceof Error
              ? pingMutation.error.message
              : "Mutasyon başarısız oldu"}
          </p>
        )}

        {pingMutation.isSuccess && !pingMutation.isPending && (
          <p className="mt-2 text-emerald-600 dark:text-emerald-400">
            ✓ Mutasyon başarılı: Önbellek senkronize edildi.
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-500 active:scale-95 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {isFetching ? "Yenileniyor..." : "Yeniden Getir (Refetch)"}
        </button>

        <button
          type="button"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["health"] })}
          disabled={isFetching}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 active:scale-95 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Önbelleği Geçersiz Kıl
        </button>

        <button
          type="button"
          onClick={() => pingMutation.mutate()}
          disabled={pingMutation.isPending}
          className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          {pingMutation.isPending ? "Pingleniyor..." : "Mutation Test (Ping)"}
        </button>
      </div>
    </div>
  );
}

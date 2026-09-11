"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHealth, healthQueryOptions } from "@/lib/queries/health";
import { Database, RefreshCw, Ban, Activity, CheckCircle2, AlertCircle } from "lucide-react";

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
    <div
      id="query"
      className="flex scroll-mt-24 flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div>
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                TanStack Query Demo
              </h3>
              <p className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                Sunucu durumu ve önbellek (Server-state caching)
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isPending
                ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                : error
                  ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
                  : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
            }`}
          >
            {isPending ? (
              <>
                <RefreshCw className="h-3 w-3 animate-spin" />
                <span>Yükleniyor</span>
              </>
            ) : error ? (
              <>
                <AlertCircle className="h-3 w-3" />
                <span>Hata</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3 w-3" />
                <span>API: {data?.status ?? "Bilinmiyor"}</span>
              </>
            )}
          </span>
        </div>

        <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="font-medium text-zinc-500 dark:text-zinc-400">Önbellek:</span>{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {isStale ? "Bayat (Stale)" : "Taze (Fresh)"}
              </span>
            </div>
            <div>
              <span className="font-medium text-zinc-500 dark:text-zinc-400">İstek Durumu:</span>{" "}
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
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-500 active:scale-95 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
          <span>{isFetching ? "Yenileniyor..." : "Yeniden Getir"}</span>
        </button>

        <button
          type="button"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["health"] })}
          disabled={isFetching}
          className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-zinc-300 bg-transparent px-3.5 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 active:scale-95 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Ban className="h-3.5 w-3.5" />
          <span>Önbelleği Geçersiz Kıl</span>
        </button>

        <button
          type="button"
          onClick={() => pingMutation.mutate()}
          disabled={pingMutation.isPending}
          className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-zinc-100 px-3.5 py-2.5 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-200 active:scale-95 disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          <Activity className="h-3.5 w-3.5 text-rose-500" />
          <span>{pingMutation.isPending ? "Pingleniyor..." : "Mutation Test"}</span>
        </button>
      </div>
    </div>
  );
}

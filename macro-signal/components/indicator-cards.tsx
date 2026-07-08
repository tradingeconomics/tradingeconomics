import { formatDate, formatValue } from "@/lib/format";
import { INDICATOR_CARD_ROWS, INDICATORS } from "@/lib/catalog";
import type { SnapshotRow } from "@/lib/te";
import { valenceForCode } from "@/lib/valence";
import { Card, CardContent } from "@/components/ui/card";

import { DeltaIndicator } from "./delta-indicator";
import { DeltaSparkline } from "./sparkline";

const flatCard =
  "flex h-full flex-col gap-0 rounded-sm border shadow-none ring-0 py-4";

const groupLayoutClass =
  "col-span-2 grid grid-cols-2 gap-3 lg:col-span-2 lg:grid-cols-2 lg:gap-4";

function IndicatorCard({
  snapshot,
  code,
}: {
  snapshot: SnapshotRow;
  code: string;
}) {
  const valence = valenceForCode(code);
  return (
    <Card className={flatCard}>
      <CardContent className="flex flex-1 flex-col px-4 pt-0">
        <h4 className="text-sm font-medium">{snapshot.description}</h4>
        <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight">
          {formatValue(snapshot.last, snapshot.unit)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{snapshot.unit}</p>
        <div className="mt-3">
          <DeltaSparkline
            actual={snapshot.last}
            previous={snapshot.previous}
            valence={valence}
            variant="curve"
          />
        </div>
        <div className="mt-auto border-t border-border-subtle pt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Prev{" "}
              <span className="tabular-nums text-foreground">
                {formatValue(snapshot.previous, snapshot.unit)}
              </span>
            </span>
            <DeltaIndicator
              current={snapshot.last}
              previous={snapshot.previous}
              valence={valence}
              className="text-xs"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {formatDate(snapshot.date)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export type IndicatorCardItem = {
  snapshot: SnapshotRow;
  code: string;
};

type IndicatorCardsProps = {
  cards: IndicatorCardItem[];
};

export function IndicatorCards({ cards }: IndicatorCardsProps) {
  if (cards.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No data available for this country.</p>
    );
  }

  const rows = INDICATOR_CARD_ROWS.map((row) => ({
    ...row,
    groups: row.groupIds
      .map((groupId) => ({
        id: groupId,
        items: cards.filter((card) => {
          const indicator = INDICATORS.find((item) => item.code === card.code);
          return indicator?.group === groupId;
        }),
      }))
      .filter((group) => group.items.length > 0),
  })).filter((row) => row.groups.length > 0);

  return (
    <div className="space-y-8">
      {rows.map((row) => (
        <div key={row.groupIds.join("-")}>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {row.label}
          </h3>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {row.groups.map((group) => (
              <div key={group.id} className={groupLayoutClass}>
                {group.items.map((item) => (
                  <IndicatorCard
                    key={item.snapshot.symbol}
                    snapshot={item.snapshot}
                    code={item.code}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

import {
  ArrowClockwise,
  ArrowsClockwise,
  ArrowsHorizontal,
  ArrowsLeftRight,
  ArrowsOut,
  ArrowsOutSimple,
  ArrowsVertical,
  Crop,
  FrameCorners,
  ImageSquare,
  Images,
  Info as InfoIcon,
  MagicWand,
  MagnifyingGlassPlus,
  Radical,
  Selection,
  TextT,
} from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CATEGORIES, IMAGE_OPERATIONS } from "@/lib/constants";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const groupedOperations = IMAGE_OPERATIONS.reduce(
    (acc, op) => {
      if (!acc[op.category]) {
        acc[op.category] = [];
      }
      acc[op.category].push(op);
      return acc;
    },
    {} as Record<string, typeof IMAGE_OPERATIONS>
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-5xl tracking-tight">
          Image Operations
        </h1>
        <p className="text-muted-foreground text-xl">
          Powerful image processing tools powered by imaginary
        </p>
      </div>

      {Object.entries(groupedOperations).map(([category, operations]) => {
        const categoryInfo = CATEGORIES[category as keyof typeof CATEGORIES];
        return (
          <div className="mb-12" key={category}>
            <div className="mb-6 flex items-center gap-3">
              <h2 className="font-semibold text-2xl">{categoryInfo.name}</h2>
              <Badge variant="secondary">{operations.length}</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {operations.map((operation) => {
                const iconMap = {
                  Crop,
                  MagicWand,
                  ArrowsOut,
                  ArrowsOutSimple,
                  Selection,
                  MagnifyingGlassPlus,
                  ImageSquare,
                  FrameCorners,
                  ArrowClockwise,
                  ArrowsClockwise,
                  ArrowsVertical,
                  ArrowsHorizontal,
                  Radical,
                  TextT,
                  Images,
                  ArrowsLeftRight,
                  Info: InfoIcon,
                };
                const Icon = iconMap[operation.icon as keyof typeof iconMap];
                return (
                  <Link
                    className="group"
                    key={operation.id}
                    to={`/${operation.id}` as "/"}
                  >
                    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                      <CardHeader>
                        <div className="mb-2 flex items-center justify-between">
                          {Icon && <Icon size={32} weight="duotone" />}
                          <Badge variant="outline">{category}</Badge>
                        </div>
                        <CardTitle className="transition-colors group-hover:text-primary">
                          {operation.name}
                        </CardTitle>
                        <CardDescription>
                          {operation.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

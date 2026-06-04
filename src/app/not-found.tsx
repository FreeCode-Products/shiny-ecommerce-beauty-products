import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl font-semibold text-clay">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
        This bar slipped down the drain.
      </h1>
      <p className="mt-3 text-ink-soft">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Button href="/" size="lg" className="mt-8">
        Back home
      </Button>
    </div>
  );
}

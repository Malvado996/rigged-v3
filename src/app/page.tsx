export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-background/80">
      {/* Hero */}
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-6xl md:text-8xl font-bold text-primary tracking-tight">
          Rigged
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          The modern overland community — post from the trail, connect with creators, share the road.
        </p>
      </div>

      {/* Call to Action — Sign In + Sign Up */}
      <div className="mt-12 flex flex-col sm:flex-row gap-6">
        <button className="px-10 py-5 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:opacity-90 transition shadow-lg">
          Sign In
        </button>
        <button className="px-10 py-5 border border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary/10 transition">
          Sign Up
        </button>
      </div>

      {/* Tagline */}
      <p className="mt-16 text-sm text-muted-foreground">
        Built for overlanders, by overlanders. Photos, stories, convoys, gear — all in one place.
      </p>
    </main>
  );
}
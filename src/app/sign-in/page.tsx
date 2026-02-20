// app/sign-in/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '../../lib/supabase/browser';
import { Button } from '../../components/ui/button'; // shadcn
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { LogIn, Mail } from 'lucide-react';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createSupabaseBrowser();

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        console.log(data);

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push('/'); // or /timeline
        router.refresh(); // refresh server data
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        console.log(data)

        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-8 p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Welcome to Rigged</h1>
                    <p className="mt-2 text-muted-foreground">Sign in to join the trail</p>
                </div>

                {error && <p className="text-destructive text-center">{error}</p>}

                <form onSubmit={handleEmailSignIn} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@overland.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in with Email
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        {/* Google icon SVG here or use lucide Google if available */}
                    </svg>
                    Continue with Google
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <a href="/sign-up" className="text-primary hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
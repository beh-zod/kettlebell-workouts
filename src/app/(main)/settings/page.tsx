"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { LogIn, Moon, Sun, Monitor, Check, Save } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [units, setUnits] = useState<"kg" | "lbs">("lbs")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In production, this would save to the database
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!session) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-4">⚙️</div>
          <h1 className="text-2xl font-bold mb-2">Customize Your Experience</h1>
          <p className="text-zinc-400 mb-6">
            Sign in to save your preferences and customize your workout experience.
          </p>
          <Button asChild>
            <Link href="/login">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/5 via-zinc-950 to-zinc-950" />
      
      <div className="relative max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <p className="text-zinc-400">Customize your workout experience</p>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={session.user?.email || ""}
                  disabled
                  className="bg-zinc-800/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  defaultValue={session.user?.name || ""}
                  placeholder="Your name"
                />
              </div>
            </CardContent>
          </Card>

          {/* Units */}
          <Card className="animate-slide-up stagger-1">
            <CardHeader>
              <CardTitle>Units</CardTitle>
              <CardDescription>Choose your preferred weight unit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <button
                  onClick={() => setUnits("kg")}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 transition-all text-center",
                    units === "kg"
                      ? "border-[#FF0099] bg-[#FF0099]/10"
                      : "border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <div className="text-2xl font-bold mb-1">kg</div>
                  <div className="text-sm text-zinc-500">Kilograms</div>
                </button>
                <button
                  onClick={() => setUnits("lbs")}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 transition-all text-center",
                    units === "lbs"
                      ? "border-[#FF0099] bg-[#FF0099]/10"
                      : "border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <div className="text-2xl font-bold mb-1">lbs</div>
                  <div className="text-sm text-zinc-500">Pounds</div>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Theme */}
          <Card className="animate-slide-up stagger-2">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Choose your preferred theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme("light")}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 transition-all text-center",
                    theme === "light"
                      ? "border-[#FF0099] bg-[#FF0099]/10"
                      : "border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <Sun className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm">Light</div>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 transition-all text-center",
                    theme === "dark"
                      ? "border-[#FF0099] bg-[#FF0099]/10"
                      : "border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <Moon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm">Dark</div>
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 transition-all text-center",
                    theme === "system"
                      ? "border-[#FF0099] bg-[#FF0099]/10"
                      : "border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <Monitor className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm">System</div>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Default Weights */}
          <Card className="animate-slide-up stagger-3">
            <CardHeader>
              <CardTitle>Default Weights</CardTitle>
              <CardDescription>Set your typical kettlebell weights by exercise type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Light exercises</Label>
                  <select className="w-full h-11 rounded-lg border-2 border-zinc-700 bg-zinc-900 px-4 text-zinc-100 focus:border-[#FF0099] focus:outline-none">
                    <option>8 kg / 18 lbs</option>
                    <option>12 kg / 26 lbs</option>
                    <option>16 kg / 35 lbs</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Heavy exercises</Label>
                  <select className="w-full h-11 rounded-lg border-2 border-zinc-700 bg-zinc-900 px-4 text-zinc-100 focus:border-[#FF0099] focus:outline-none">
                    <option>16 kg / 35 lbs</option>
                    <option>20 kg / 44 lbs</option>
                    <option>24 kg / 53 lbs</option>
                    <option>28 kg / 62 lbs</option>
                    <option>32 kg / 70 lbs</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleSave}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>

          {/* Danger Zone */}
          <Card className="border-red-500/20 animate-slide-up stagger-4">
            <CardHeader>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
              <p className="text-xs text-zinc-500 mt-2 text-center">
                This will permanently delete your account and all workout data.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


import { Key, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  // Mock user data - replace with real data from Convex/Clerk
  const mockUser = {
    username: "Truth Seeker",
    keysEarned: 2,
    theoriesCompleted: 1,
    streak: 3,
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-safe">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-safe">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* User Info Card */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center border-4 border-slate-600">
              <span className="text-4xl">🐰</span>
            </div>
            <CardTitle className="text-2xl">{mockUser.username}</CardTitle>
            <p className="text-sm text-slate-400">Deep down the rabbit hole</p>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Key className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-500">
                {mockUser.keysEarned}
              </div>
              <div className="text-xs text-slate-400">Keys</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-green-500/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-500">
                {mockUser.theoriesCompleted}
              </div>
              <div className="text-xs text-slate-400">Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-500/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-500">
                {mockUser.streak}
              </div>
              <div className="text-xs text-slate-400">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg">Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌙</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Moon Walker</div>
                <div className="text-sm text-slate-400">
                  Completed Moon Landing theory
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 opacity-50">
              <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center">
                <span className="text-2xl grayscale">👽</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Area 51 Explorer</div>
                <div className="text-sm text-slate-400">Locked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Section */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Notifications
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-400 hover:text-red-400">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

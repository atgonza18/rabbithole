import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ListTree, Home, Database } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl pt-safe px-safe">
        <div className="px-4 py-4">
          <h1 className="text-3xl font-bold">Admin</h1>
          <p className="text-sm text-slate-400 mt-1">Manage conspiracy theories</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Manage Your Conspiracy Theories</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="cursor-pointer hover:border-slate-600 transition-colors" onClick={() => navigate("/admin/theories")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <ListTree className="w-6 h-6 text-green-500" />
                </div>
                <CardTitle>Manage Theories</CardTitle>
                <CardDescription>
                  Create, edit, and organize conspiracy theories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Manage Theories</Button>
              </CardContent>
            </Card>

            <Card className="opacity-50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>Content Library</CardTitle>
                <CardDescription>
                  Browse all pages and questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" disabled>Coming Soon</Button>
              </CardContent>
            </Card>

            <Card className="opacity-50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Database className="w-4 h-4 text-purple-500" />
                </div>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  View user progress and completion rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" disabled>Coming Soon</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

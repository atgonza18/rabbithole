import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Edit, Trash2, Lock, LockOpen } from "lucide-react";

export default function TheoryManagement() {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const theories = useQuery(api.theories.getAllTheories);
  const createTheory = useMutation(api.theories.createTheory);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    difficulty: "beginner" as "beginner" | "intermediate" | "expert",
    estimatedTimeMinutes: 10,
    isLocked: true,
  });

  const handleCreate = async () => {
    if (!formData.title || !formData.description) {
      alert("Please fill in title and description");
      return;
    }

    try {
      // Get the next order number
      const nextOrder = theories ? theories.length : 0;

      await createTheory({
        title: formData.title,
        description: formData.description,
        icon: formData.icon || "❓",
        difficulty: formData.difficulty,
        estimatedTimeMinutes: formData.estimatedTimeMinutes,
        isLocked: formData.isLocked,
        order: nextOrder,
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        icon: "",
        difficulty: "beginner",
        estimatedTimeMinutes: 10,
        isLocked: true,
      });

      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Failed to create theory:", error);
      alert("Failed to create theory");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">Theory Management</h1>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Theory
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Theory</DialogTitle>
                  <DialogDescription>
                    Add a new conspiracy theory to the learning path
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Moon Landing Hoax"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the theory..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="icon">Icon (Emoji)</Label>
                      <Input
                        id="icon"
                        placeholder="🌙"
                        value={formData.icon}
                        onChange={(e) =>
                          setFormData({ ...formData, icon: e.target.value })
                        }
                        maxLength={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Estimated Time (minutes)</Label>
                      <Input
                        id="time"
                        type="number"
                        value={formData.estimatedTimeMinutes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            estimatedTimeMinutes: parseInt(e.target.value) || 10,
                          })
                        }
                        min={1}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <select
                      id="difficulty"
                      value={formData.difficulty}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          difficulty: e.target.value as any,
                        })
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="locked"
                      checked={formData.isLocked}
                      onChange={(e) =>
                        setFormData({ ...formData, isLocked: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <Label htmlFor="locked">Start as locked (requires key to unlock)</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreate}>Create Theory</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {theories === undefined ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : theories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No theories yet. Create your first one!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {theories.map((theory) => (
              <Card key={theory._id} className="hover:border-slate-600 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">{theory.icon || "❓"}</div>
                    <div className="flex items-center gap-1">
                      {theory.isLocked ? (
                        <Lock className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <LockOpen className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-1">{theory.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {theory.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <span className="px-2 py-1 rounded-full bg-slate-800 capitalize">
                      {theory.difficulty}
                    </span>
                    <span>{theory.estimatedTimeMinutes} min</span>
                    <span>Order: {theory.order}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Pages
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

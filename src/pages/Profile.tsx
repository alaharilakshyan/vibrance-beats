import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Camera, Settings, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.fullName || "");

  const handleSave = async () => {
    try {
      await user?.update({
        firstName: displayName.split(' ')[0] || displayName,
        lastName: displayName.split(' ').slice(1).join(' ') || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
            <AvatarFallback className="text-2xl">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            variant="secondary"
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full p-0"
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {user?.fullName || "Your Profile"}
          </h1>
          <p className="text-muted-foreground">{user?.emailAddresses[0]?.emailAddress}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : "Recently"}
          </p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your display name"
                    />
                    <Button onClick={handleSave} size="sm">
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setDisplayName(user?.fullName || "");
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{user?.fullName || "Not set"}</span>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">{user?.emailAddresses[0]?.emailAddress}</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and subscription.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Subscription</h4>
                    <p className="text-sm text-muted-foreground">Free Plan</p>
                  </div>
                  <Button variant="outline">Upgrade</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Connected Devices</h4>
                    <p className="text-sm text-muted-foreground">Manage your connected devices</p>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Download Quality</h4>
                    <p className="text-sm text-muted-foreground">Standard Quality</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Public Profile</h4>
                    <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
                  </div>
                  <Button variant="outline">Private</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Activity Sharing</h4>
                    <p className="text-sm text-muted-foreground">Share what you're listening to</p>
                  </div>
                  <Button variant="outline">Disabled</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Data Export</h4>
                    <p className="text-sm text-muted-foreground">Download your data</p>
                  </div>
                  <Button variant="outline">Request</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
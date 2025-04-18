
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Package, Heart, Settings, ShoppingBag } from "lucide-react";
import { registerUser, loginUser, logoutUser, getCurrentUser, updateUserProfile } from "@/utils/authUtils";
import { toast } from "sonner";
import { User as UserType } from "@/types/auth";

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState<string>("login");

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setEmail(user.email);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }

    const handleLogin = () => {
      const user = getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        setEmail(user.email);
        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
      }
    };

    const handleProfileUpdate = () => {
      const user = getCurrentUser();
      if (user) {
        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
      }
    };

    const handleLogout = () => {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhone("");
    };

    window.addEventListener('userLoggedIn', handleLogin);
    window.addEventListener('userLoggedOut', handleLogout);
    window.addEventListener('userProfileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('userLoggedIn', handleLogin);
      window.removeEventListener('userLoggedOut', handleLogout);
      window.removeEventListener('userProfileUpdated', handleProfileUpdate);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser(email, password)) {
      toast.success("Successfully logged in!");
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    
    if (registerUser(email, password)) {
      toast.success("Registration successful! You can now login.");
      setActiveTab("login"); // Switch to login tab after successful registration
    } else {
      toast.error("Email already exists");
    }
  };

  const handleLogout = () => {
    logoutUser();
    toast.success("Successfully logged out!");
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateUserProfile({ firstName, lastName })) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cycle-light py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="mb-6 text-3xl font-bold">My Account</h1>

          {isLoggedIn ? (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cycle-light">
                        <User className="h-5 w-5 text-cycle" />
                      </div>
                      <div>
                        <CardTitle>{firstName || lastName ? `${firstName} ${lastName}`.trim() : "User"}</CardTitle>
                        <CardDescription>{email}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <nav className="flex flex-col space-y-1">
                      <Button variant="ghost" className="justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Package className="mr-2 h-4 w-4" />
                        Orders
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </nav>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Sign out
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="lg:col-span-9">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your account details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={handleProfileUpdate}>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            placeholder="First Name" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Last Name" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} readOnly disabled />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          placeholder="+1 (555) 123-4567" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      
                      <Button type="submit" className="bg-cycle hover:bg-cycle-dark">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Your recent purchase history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="flex flex-col">
                          <div className="p-4 border-b flex items-center justify-between">
                            <div>
                              <p className="font-medium">#ORD12345</p>
                              <p className="text-sm text-gray-500">March 15, 2025</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$599.99</p>
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                                Delivered
                              </span>
                            </div>
                          </div>
                          <div className="p-4 border-b flex items-center justify-between">
                            <div>
                              <p className="font-medium">#ORD12356</p>
                              <p className="text-sm text-gray-500">February 28, 2025</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$449.99</p>
                              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                Shipped
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        View All Orders
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-md">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In or Create an Account</CardTitle>
                  <CardDescription>
                    Access your account to track orders and manage your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="loginEmail">Email</Label>
                          <Input 
                            id="loginEmail" 
                            type="email" 
                            placeholder="you@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="loginPassword">Password</Label>
                          <Input 
                            id="loginPassword" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-cycle hover:bg-cycle-dark">
                          Login
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="register">
                      <form onSubmit={handleRegister} className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registerEmail">Email</Label>
                          <Input 
                            id="registerEmail" 
                            type="email" 
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registerPassword">Password</Label>
                          <Input 
                            id="registerPassword" 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-cycle hover:bg-cycle-dark">
                          Register
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

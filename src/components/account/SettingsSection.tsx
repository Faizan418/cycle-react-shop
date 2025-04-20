
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { toast } from "sonner";

export const SettingsSection = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="space-y-0.5">
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark mode
              </p>
            </div>
            {theme === "light" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={handleThemeChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about your account activity
            </p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Order Updates</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about your order status
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Marketing Emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive special offers and promotions
            </p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};

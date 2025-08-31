import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
export function SettingsFarmer({ user, onSaveSettings }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto shadow-lg border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <span role="img" aria-label="settings">⚙️</span> Farmer Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Notifications:</span>
              <Button variant="outline" className="bg-green-50 text-green-700 border-green-300">Toggle</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Theme:</span>
              <Button variant="outline" className="bg-green-50 text-green-700 border-green-300">Change</Button>
            </div>
            <Button className="bg-green-600 text-white w-full mt-4" onClick={onSaveSettings}>
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

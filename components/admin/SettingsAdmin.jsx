import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
export function SettingsAdmin({ user, onSaveSettings }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto shadow-lg border-gray-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <span role="img" aria-label="settings">⚙️</span> Admin Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Notifications:</span>
              <Button variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">Toggle</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Theme:</span>
              <Button variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">Change</Button>
            </div>
            <Button className="bg-gray-700 text-white w-full mt-4" onClick={onSaveSettings}>
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

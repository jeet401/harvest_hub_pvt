import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
export function SettingsBuyer({ user, onSaveSettings }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto shadow-lg border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <span role="img" aria-label="settings">⚙️</span> Buyer Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Notifications:</span>
              <Button variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Toggle</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Theme:</span>
              <Button variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Change</Button>
            </div>
            <Button className="bg-blue-600 text-white w-full mt-4" onClick={onSaveSettings}>
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
export function ProfileAdmin({ user }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto shadow-lg border-gray-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <span role="img" aria-label="profile">🛡️</span> Admin Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Name:</span>
              <span className="text-gray-800">{user?.name || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Email:</span>
              <span className="text-gray-800">{user?.email || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Role:</span>
              <span className="text-gray-800 capitalize">Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Platform Access:</span>
              <span className="text-gray-600">Full</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

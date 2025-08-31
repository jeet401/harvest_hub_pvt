import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

export function ProfilePage({ user, onEditProfile }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto shadow-lg border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <span role="img" aria-label="profile">👤</span> Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Name:</span>
              <span className="text-green-800">{user?.name || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Email:</span>
              <span className="text-green-800">{user?.email || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Role:</span>
              <span className="text-green-800 capitalize">{user?.role || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Verified:</span>
              <span className="text-green-600">{user?.verified ? 'Yes' : 'No'}</span>
            </div>
            <Button className="bg-green-600 text-white w-full mt-4" onClick={onEditProfile}>
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

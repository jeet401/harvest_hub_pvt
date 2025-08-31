import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
export function ProfileFarmer({ user }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto shadow-lg border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <span role="img" aria-label="profile">👨‍🌾</span> Farmer Profile
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
              <span className="text-green-800 capitalize">Farmer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Farm Size:</span>
              <span className="text-green-600">{user?.farmSize || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Experience:</span>
              <span className="text-green-600">{user?.experience || 'N/A'} years</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

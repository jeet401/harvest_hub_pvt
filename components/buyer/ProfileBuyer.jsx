import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
export function ProfileBuyer({ user }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto shadow-lg border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <span role="img" aria-label="profile">👤</span> Buyer Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Name:</span>
              <span className="text-blue-800">{user?.name || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Email:</span>
              <span className="text-blue-800">{user?.email || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Role:</span>
              <span className="text-blue-800 capitalize">Buyer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Verified:</span>
              <span className="text-blue-600">{user?.verified ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">CSS Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Test input field" />
              <Button className="w-full">Primary Button</Button>
              <Button variant="outline" className="w-full">Outline Button</Button>
              <Button variant="secondary" className="w-full">Secondary Button</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Color Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-8 bg-primary rounded"></div>
                <div className="h-8 bg-secondary rounded"></div>
                <div className="h-8 bg-accent rounded"></div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Typography Test</h2>
          <p className="text-gray-600 mb-4">This is a paragraph with gray text.</p>
          <p className="text-sm text-muted-foreground">This is small muted text.</p>
        </div>
      </div>
    </div>
  );
}
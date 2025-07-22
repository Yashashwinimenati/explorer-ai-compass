import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plane, Calendar, Users, DollarSign, Heart, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ItineraryFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const ItineraryForm = ({ onBack, onSuccess }: ItineraryFormProps) => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    numTravelers: '1',
    budget: '',
    interests: [] as string[],
    additionalInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const budgetOptions = [
    'Budget ($0-50/day)',
    'Mid-range ($50-150/day)',
    'Luxury ($150+/day)',
    'Ultra-luxury ($500+/day)'
  ];

  const interestOptions = [
    'Adventure',
    'Culture',
    'Food & Dining',
    'Nature',
    'History',
    'Art & Museums',
    'Beach & Relaxation',
    'Shopping',
    'Nightlife',
    'Photography',
    'Wildlife',
    'Architecture',
    'Local Experiences',
    'Spiritual & Wellness'
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.interests.length === 0) {
      toast({
        title: "Select interests",
        description: "Please select at least one interest for better recommendations",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-itinerary', {
        body: formData
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate itinerary');
      }

      if (data.success) {
        toast({
          title: "Success!",
          description: "Your itinerary has been generated successfully",
        });
        onSuccess();
      } else {
        throw new Error(data.error || 'Failed to generate itinerary');
      }
    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <Plane className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Plan New Trip</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MapPin className="h-6 w-6 text-primary" />
              Tell us about your dream trip
            </CardTitle>
            <CardDescription>
              Provide some details and let our AI create the perfect itinerary for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  placeholder="e.g., Paris, France or Tokyo, Japan"
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  required
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Number of Travelers */}
              <div className="space-y-2">
                <Label htmlFor="numTravelers" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Number of Travelers
                </Label>
                <Select value={formData.numTravelers} onValueChange={(value) => setFormData(prev => ({ ...prev, numTravelers: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} traveler{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget Range
                </Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  What interests you? (Select all that apply)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {interestOptions.map(interest => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label 
                        htmlFor={interest} 
                        className="text-sm font-normal cursor-pointer"
                      >
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any special requirements, dietary restrictions, mobility needs, or specific places you want to visit?"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onBack}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Itinerary...
                    </>
                  ) : (
                    'Generate My Itinerary'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ItineraryForm;
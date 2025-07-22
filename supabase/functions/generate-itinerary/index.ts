import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from '../_shared/supabase.ts';

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, startDate, endDate, numTravelers, budget, interests, additionalInfo } = await req.json();
    
    // Get user info from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Invalid user token');
    }

    // Create detailed prompt for Gemini
    const prompt = `You are an expert travel planner. Create a detailed day-by-day itinerary for the following trip:

Destination: ${destination}
Duration: ${startDate} to ${endDate}
Number of travelers: ${numTravelers}
Budget: ${budget}
Interests: ${interests.join(', ')}
Additional information: ${additionalInfo || 'None'}

Please provide a comprehensive itinerary that includes:
- Day-by-day breakdown with specific activities
- Recommended restaurants and local cuisine to try
- Transportation suggestions
- Accommodation recommendations
- Cultural highlights and must-see attractions
- Budget-friendly tips
- Safety considerations
- Best times to visit attractions
- Local customs and etiquette tips

Format the response as a detailed travel guide with clear sections for each day.`;

    console.log('Calling Gemini API with prompt length:', prompt.length);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const generatedContent = data.candidates[0].content.parts[0].text;

    // Save the itinerary to the database
    const { data: itinerary, error: dbError } = await supabase
      .from('itineraries')
      .insert({
        user_id: user.id,
        destination,
        start_date: startDate,
        end_date: endDate,
        num_travelers: parseInt(numTravelers),
        budget,
        interests,
        additional_info: additionalInfo,
        content: {
          generated_text: generatedContent,
          generated_at: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log('Itinerary saved successfully');

    return new Response(JSON.stringify({
      success: true,
      itinerary: {
        id: itinerary.id,
        content: generatedContent
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-itinerary function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
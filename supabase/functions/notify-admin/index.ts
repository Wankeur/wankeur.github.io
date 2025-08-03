import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

interface NotificationRequest {
  type: 'project' | 'tutorial';
  id: string;
  title: string;
  user_id?: string;
  created_by?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, id, title, user_id, created_by }: NotificationRequest = await req.json();

    // Get user email for the submission
    let userEmail = '';
    let userName = '';
    
    if (user_id || created_by) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, first_name, last_name')
        .eq('user_id', user_id || created_by)
        .single();
      
      if (profile) {
        userEmail = profile.email;
        userName = `${profile.first_name} ${profile.last_name}`.trim() || 'Unknown User';
      }
    }

    // Get admin email - you should replace this with your actual admin email
    const adminEmail = "alexandreradermacker@gmail.com";

    const emailResponse = await resend.emails.send({
      from: "DAEDALE <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New ${type} Submission: ${title}`,
      html: `
        <h1>New ${type.charAt(0).toUpperCase() + type.slice(1)} Submission</h1>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Submitted by:</strong> ${userName} (${userEmail})</p>
        <p><strong>${type.charAt(0).toUpperCase() + type.slice(1)} ID:</strong> ${id}</p>
        
        <p>Please review and approve/reject this submission in your admin panel:</p>
        <p><a href="https://fwzmmcgkzhaajnhgfxxa.supabase.co/dashboard/project/fwzmmcgkzhaajnhgfxxa/editor" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Panel</a></p>
        
        <p>Best regards,<br>DAEDALE System</p>
      `,
    });

    console.log("Admin notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-admin function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
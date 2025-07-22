export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      analysis_criteria: {
        Row: {
          created_at: string
          id: string
          min_experience_years: number | null
          min_github_projects: number | null
          min_projects: number | null
          preferred_languages: string[] | null
          required_skills: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          min_experience_years?: number | null
          min_github_projects?: number | null
          min_projects?: number | null
          preferred_languages?: string[] | null
          required_skills?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          min_experience_years?: number | null
          min_github_projects?: number | null
          min_projects?: number | null
          preferred_languages?: string[] | null
          required_skills?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          applied_at: string
          cover_letter: string | null
          id: string
          job_id: string
          status: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          cover_letter?: string | null
          id?: string
          job_id: string
          status?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          cover_letter?: string | null
          id?: string
          job_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_rankings: {
        Row: {
          ai_analysis: string | null
          candidate_id: string
          created_at: string | null
          employer_id: string
          experience_match: string | null
          id: string
          job_id: string
          match_score: number
          skills_match: string[] | null
          updated_at: string | null
        }
        Insert: {
          ai_analysis?: string | null
          candidate_id: string
          created_at?: string | null
          employer_id: string
          experience_match?: string | null
          id?: string
          job_id: string
          match_score: number
          skills_match?: string[] | null
          updated_at?: string | null
        }
        Update: {
          ai_analysis?: string | null
          candidate_id?: string
          created_at?: string | null
          employer_id?: string
          experience_match?: string | null
          id?: string
          job_id?: string
          match_score?: number
          skills_match?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_rankings_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      class_sessions: {
        Row: {
          analysis_requested: boolean | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          instructor_id: string | null
          status: Database["public"]["Enums"]["session_status"] | null
          title: string
          updated_at: string | null
          upload_date: string | null
        }
        Insert: {
          analysis_requested?: boolean | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          instructor_id?: string | null
          status?: Database["public"]["Enums"]["session_status"] | null
          title: string
          updated_at?: string | null
          upload_date?: string | null
        }
        Update: {
          analysis_requested?: boolean | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          instructor_id?: string | null
          status?: Database["public"]["Enums"]["session_status"] | null
          title?: string
          updated_at?: string | null
          upload_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_sessions_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_reports: {
        Row: {
          ai_summary: string | null
          behavior_analysis: Json | null
          clarity_score: number | null
          created_at: string | null
          id: string
          improvement_areas: string[] | null
          processed_at: string | null
          sentiment_score: number | null
          session_id: string | null
          strengths: string[] | null
          suggestions: string[] | null
          tone_analysis: Json | null
          transcript: string | null
        }
        Insert: {
          ai_summary?: string | null
          behavior_analysis?: Json | null
          clarity_score?: number | null
          created_at?: string | null
          id?: string
          improvement_areas?: string[] | null
          processed_at?: string | null
          sentiment_score?: number | null
          session_id?: string | null
          strengths?: string[] | null
          suggestions?: string[] | null
          tone_analysis?: Json | null
          transcript?: string | null
        }
        Update: {
          ai_summary?: string | null
          behavior_analysis?: Json | null
          clarity_score?: number | null
          created_at?: string | null
          id?: string
          improvement_areas?: string[] | null
          processed_at?: string | null
          sentiment_score?: number | null
          session_id?: string | null
          strengths?: string[] | null
          suggestions?: string[] | null
          tone_analysis?: Json | null
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_reports_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "class_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      instructors: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          role: Database["public"]["Enums"]["user_role_type"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          role?: Database["public"]["Enums"]["user_role_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      interview_analyses: {
        Row: {
          analysis: Json
          audio_file_name: string
          candidate_name: string | null
          confidence_score: number | null
          created_at: string
          id: string
          recommendation: string
          transcript: string
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis: Json
          audio_file_name: string
          candidate_name?: string | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          recommendation: string
          transcript: string
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis?: Json
          audio_file_name?: string
          candidate_name?: string | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          recommendation?: string
          transcript?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      itineraries: {
        Row: {
          additional_info: string | null
          budget: string
          content: Json | null
          created_at: string
          destination: string
          end_date: string
          id: string
          interests: string[]
          num_travelers: number
          start_date: string
          user_id: string
        }
        Insert: {
          additional_info?: string | null
          budget: string
          content?: Json | null
          created_at?: string
          destination: string
          end_date: string
          id?: string
          interests: string[]
          num_travelers: number
          start_date: string
          user_id: string
        }
        Update: {
          additional_info?: string | null
          budget?: string
          content?: Json | null
          created_at?: string
          destination?: string
          end_date?: string
          id?: string
          interests?: string[]
          num_travelers?: number
          start_date?: string
          user_id?: string
        }
        Relationships: []
      }
      job_descriptions: {
        Row: {
          ai_feedback: Json | null
          created_at: string
          id: string
          original_text: string
          role: string
          score: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_feedback?: Json | null
          created_at?: string
          id?: string
          original_text: string
          role: string
          score?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_feedback?: Json | null
          created_at?: string
          id?: string
          original_text?: string
          role?: string
          score?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      job_matches: {
        Row: {
          created_at: string | null
          experience_match: number | null
          id: string
          job_id: string
          match_score: number
          skills_match: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          experience_match?: number | null
          id?: string
          job_id: string
          match_score?: number
          skills_match?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          experience_match?: number | null
          id?: string
          job_id?: string
          match_score?: number
          skills_match?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_recommendations: {
        Row: {
          created_at: string | null
          id: string
          job_id: string
          match_score: number
          reasoning: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id: string
          match_score: number
          reasoning?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string
          match_score?: number
          reasoning?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_recommendations_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          application_deadline: string | null
          company_name: string | null
          created_at: string | null
          description: string
          employer_id: string
          experience_years: number
          id: string
          job_type: string | null
          location: string
          openings: number
          remote_option: boolean | null
          required_skills: string[]
          salary_range: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          application_deadline?: string | null
          company_name?: string | null
          created_at?: string | null
          description: string
          employer_id: string
          experience_years?: number
          id?: string
          job_type?: string | null
          location: string
          openings?: number
          remote_option?: boolean | null
          required_skills?: string[]
          salary_range?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          application_deadline?: string | null
          company_name?: string | null
          created_at?: string | null
          description?: string
          employer_id?: string
          experience_years?: number
          id?: string
          job_type?: string | null
          location?: string
          openings?: number
          remote_option?: boolean | null
          required_skills?: string[]
          salary_range?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      procurement_assets: {
        Row: {
          asset_name: string
          cost: number
          created_at: string
          department: string
          id: string
          procurement_date: string
          status: string
          updated_at: string
          user_id: string
          vendor: string
        }
        Insert: {
          asset_name: string
          cost: number
          created_at?: string
          department: string
          id?: string
          procurement_date: string
          status: string
          updated_at?: string
          user_id: string
          vendor: string
        }
        Update: {
          asset_name?: string
          cost?: number
          created_at?: string
          department?: string
          id?: string
          procurement_date?: string
          status?: string
          updated_at?: string
          user_id?: string
          vendor?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ai_extracted_skills: string[] | null
          ai_summary: string | null
          created_at: string
          education: string | null
          email: string | null
          experience_years: number | null
          full_name: string | null
          github_url: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          phone: string | null
          portfolio_url: string | null
          resume_text: string | null
          resume_url: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          skills: string[] | null
          summary: string | null
        }
        Insert: {
          ai_extracted_skills?: string[] | null
          ai_summary?: string | null
          created_at?: string
          education?: string | null
          email?: string | null
          experience_years?: number | null
          full_name?: string | null
          github_url?: string | null
          id: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_text?: string | null
          resume_url?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skills?: string[] | null
          summary?: string | null
        }
        Update: {
          ai_extracted_skills?: string[] | null
          ai_summary?: string | null
          created_at?: string
          education?: string | null
          email?: string | null
          experience_years?: number | null
          full_name?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_text?: string | null
          resume_url?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skills?: string[] | null
          summary?: string | null
        }
        Relationships: []
      }
      recognitions: {
        Row: {
          created_at: string
          department: string
          description: string
          employee_name: string
          id: string
          image_url: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department: string
          description: string
          employee_name: string
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string
          description?: string
          employee_name?: string
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resume_analyses: {
        Row: {
          candidate_email: string | null
          candidate_name: string | null
          candidate_user_id: string
          created_at: string
          criteria_matched: number | null
          education: string | null
          experience_years: number | null
          git_link: string | null
          github_projects: string[] | null
          github_projects_count: number | null
          id: string
          match_percentage: number | null
          programming_languages: string[] | null
          programming_languages_count: number | null
          projects: string[] | null
          projects_count: number | null
          resume_content: string | null
          resume_link: string
          skills: string[] | null
          skills_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          candidate_email?: string | null
          candidate_name?: string | null
          candidate_user_id: string
          created_at?: string
          criteria_matched?: number | null
          education?: string | null
          experience_years?: number | null
          git_link?: string | null
          github_projects?: string[] | null
          github_projects_count?: number | null
          id?: string
          match_percentage?: number | null
          programming_languages?: string[] | null
          programming_languages_count?: number | null
          projects?: string[] | null
          projects_count?: number | null
          resume_content?: string | null
          resume_link: string
          skills?: string[] | null
          skills_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          candidate_email?: string | null
          candidate_name?: string | null
          candidate_user_id?: string
          created_at?: string
          criteria_matched?: number | null
          education?: string | null
          experience_years?: number | null
          git_link?: string | null
          github_projects?: string[] | null
          github_projects_count?: number | null
          id?: string
          match_percentage?: number | null
          programming_languages?: string[] | null
          programming_languages_count?: number | null
          projects?: string[] | null
          projects_count?: number | null
          resume_content?: string | null
          resume_link?: string
          skills?: string[] | null
          skills_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resumes: {
        Row: {
          created_at: string | null
          file_url: string | null
          id: string
          parsed_experience_years: number | null
          parsed_projects: string[] | null
          parsed_skills: string[] | null
          resume_text: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          parsed_experience_years?: number | null
          parsed_projects?: string[] | null
          parsed_skills?: string[] | null
          resume_text?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          parsed_experience_years?: number | null
          parsed_projects?: string[] | null
          parsed_skills?: string[] | null
          resume_text?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          job_role: Database["public"]["Enums"]["job_portal_role"] | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          job_role?: Database["public"]["Enums"]["job_portal_role"] | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          job_role?: Database["public"]["Enums"]["job_portal_role"] | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          emoji: string
          id: string
          recognition_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          recognition_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          recognition_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_recognition_id_fkey"
            columns: ["recognition_id"]
            isOneToOne: false
            referencedRelation: "recognitions"
            referencedColumns: ["id"]
          },
        ]
      }
      workshop_registrations: {
        Row: {
          college_company: string
          created_at: string
          email: string
          experience_level: string
          id: string
          name: string
          phone: string
          updated_at: string
        }
        Insert: {
          college_company: string
          created_at?: string
          email: string
          experience_level: string
          id?: string
          name: string
          phone: string
          updated_at?: string
        }
        Update: {
          college_company?: string
          created_at?: string
          email?: string
          experience_level?: string
          id?: string
          name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      job_portal_role: "job_seeker" | "employer"
      session_status: "processing" | "completed" | "failed"
      user_role: "employer" | "job_seeker"
      user_role_type: "instructor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      job_portal_role: ["job_seeker", "employer"],
      session_status: ["processing", "completed", "failed"],
      user_role: ["employer", "job_seeker"],
      user_role_type: ["instructor", "admin"],
    },
  },
} as const

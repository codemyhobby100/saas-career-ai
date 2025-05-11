export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          headline: string | null
          bio: string | null
          location: string | null
          preferred_job_types: string[] | null
          skills: string[] | null
          experience_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          headline?: string | null
          bio?: string | null
          location?: string | null
          preferred_job_types?: string[] | null
          skills?: string[] | null
          experience_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          headline?: string | null
          bio?: string | null
          location?: string | null
          preferred_job_types?: string[] | null
          skills?: string[] | null
          experience_level?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          title: string
          file_url: string
          parsed_content: string | null
          analysis_score: number | null
          feedback: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          file_url: string
          parsed_content?: string | null
          analysis_score?: number | null
          feedback?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          file_url?: string
          parsed_content?: string | null
          analysis_score?: number | null
          feedback?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
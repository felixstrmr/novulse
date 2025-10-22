export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      client_users: {
        Row: {
          client: string
          created_at: string
          id: string
          user: string
          workspace: string
        }
        Insert: {
          client: string
          created_at?: string
          id?: string
          user: string
          workspace: string
        }
        Update: {
          client?: string
          created_at?: string
          id?: string
          user?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_users_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_users_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_users_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          name: string
          path: string
          size: number
          type: string
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          name: string
          path: string
          size: number
          type: string
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          name?: string
          path?: string
          size?: number
          type?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      project_priorities: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          name: string
          position: number
          workspace: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          name: string
          position: number
          workspace: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
          position?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_priorities_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      project_statuses: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          is_default: boolean
          name: string
          position: number
          workspace: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          is_default?: boolean
          name: string
          position: number
          workspace: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          is_default?: boolean
          name?: string
          position?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_statuses_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      project_users: {
        Row: {
          created_at: string
          id: string
          project: string
          user: string
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          project: string
          user: string
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          project?: string
          user?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_users_project_fkey"
            columns: ["project"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_users_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_users_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          client: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          priority: string | null
          start_date: string | null
          status: string
          target_date: string | null
          workspace: string
        }
        Insert: {
          client: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          priority?: string | null
          start_date?: string | null
          status: string
          target_date?: string | null
          workspace: string
        }
        Update: {
          client?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          priority?: string | null
          start_date?: string | null
          status?: string
          target_date?: string | null
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_priority_fkey"
            columns: ["priority"]
            isOneToOne: false
            referencedRelation: "project_priorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "project_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      task_comments: {
        Row: {
          comment: string
          created_at: string
          id: string
          task: string
          user: string | null
          workspace: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          task: string
          user?: string | null
          workspace: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          task?: string
          user?: string | null
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_fkey"
            columns: ["task"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_comments_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_comments_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      task_images: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          image: string
          task: string
          version: number
          workspace: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          image: string
          task: string
          version: number
          workspace: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          image?: string
          task?: string
          version?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_images_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_images_image_fkey"
            columns: ["image"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_images_task_fkey"
            columns: ["task"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_images_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      task_priorities: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          name: string
          position: number
          workspace: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          name: string
          position: number
          workspace: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
          position?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_priorities_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      task_statuses: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          is_default: boolean
          name: string
          position: number
          workspace: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          is_default?: boolean
          name: string
          position: number
          workspace: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          is_default?: boolean
          name?: string
          position?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_statuses_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      task_users: {
        Row: {
          created_at: string
          id: string
          task: string
          user: string
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          task: string
          user: string
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          task?: string
          user?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_users_task_fkey"
            columns: ["task"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_users_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_users_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          priority: string | null
          project: string
          status: string
          target_date: string | null
          type: Database["public"]["Enums"]["task_types"]
          workspace: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          priority?: string | null
          project: string
          status: string
          target_date?: string | null
          type?: Database["public"]["Enums"]["task_types"]
          workspace: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          priority?: string | null
          project?: string
          status?: string
          target_date?: string | null
          type?: Database["public"]["Enums"]["task_types"]
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_priority_fkey"
            columns: ["priority"]
            isOneToOne: false
            referencedRelation: "task_priorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_fkey"
            columns: ["project"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "task_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          display_name: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          timezone: Database["public"]["Enums"]["timezones"]
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          timezone?: Database["public"]["Enums"]["timezones"]
        }
        Update: {
          avatar?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          timezone?: Database["public"]["Enums"]["timezones"]
        }
        Relationships: []
      }
      workspace_users: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["workpsace_user_roles"]
          user: string
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["workpsace_user_roles"]
          user: string
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["workpsace_user_roles"]
          user?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_users_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_users_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          domain: string
          id: string
          name: string
          settings: Json
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
          name: string
          settings?: Json
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
          name?: string
          settings?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_workspace_user: {
        Args: { user_id: string; workspace_id: string }
        Returns: boolean
      }
    }
    Enums: {
      task_types: "image"
      timezones:
        | "Africa/Abidjan"
        | "Africa/Accra"
        | "Africa/Addis_Ababa"
        | "Africa/Algiers"
        | "Africa/Asmara"
        | "Africa/Bamako"
        | "Africa/Bangui"
        | "Africa/Banjul"
        | "Africa/Bissau"
        | "Africa/Blantyre"
        | "Africa/Brazzaville"
        | "Africa/Bujumbura"
        | "Africa/Cairo"
        | "Africa/Casablanca"
        | "Africa/Ceuta"
        | "Africa/Conakry"
        | "Africa/Dakar"
        | "Africa/Dar_es_Salaam"
        | "Africa/Djibouti"
        | "Africa/Douala"
        | "Africa/El_Aaiun"
        | "Africa/Freetown"
        | "Africa/Gaborone"
        | "Africa/Harare"
        | "Africa/Johannesburg"
        | "Africa/Juba"
        | "Africa/Kampala"
        | "Africa/Khartoum"
        | "Africa/Kigali"
        | "Africa/Kinshasa"
        | "Africa/Lagos"
        | "Africa/Libreville"
        | "Africa/Lome"
        | "Africa/Luanda"
        | "Africa/Lubumbashi"
        | "Africa/Lusaka"
        | "Africa/Malabo"
        | "Africa/Maputo"
        | "Africa/Maseru"
        | "Africa/Mbabane"
        | "Africa/Mogadishu"
        | "Africa/Monrovia"
        | "Africa/Nairobi"
        | "Africa/Ndjamena"
        | "Africa/Niamey"
        | "Africa/Nouakchott"
        | "Africa/Ouagadougou"
        | "Africa/Porto-Novo"
        | "Africa/Sao_Tome"
        | "Africa/Tripoli"
        | "Africa/Tunis"
        | "Africa/Windhoek"
        | "America/Adak"
        | "America/Anchorage"
        | "America/Anguilla"
        | "America/Antigua"
        | "America/Araguaina"
        | "America/Argentina/Buenos_Aires"
        | "America/Argentina/Catamarca"
        | "America/Argentina/Cordoba"
        | "America/Argentina/Jujuy"
        | "America/Argentina/La_Rioja"
        | "America/Argentina/Mendoza"
        | "America/Argentina/Rio_Gallegos"
        | "America/Argentina/Salta"
        | "America/Argentina/San_Juan"
        | "America/Argentina/San_Luis"
        | "America/Argentina/Tucuman"
        | "America/Argentina/Ushuaia"
        | "America/Aruba"
        | "America/Asuncion"
        | "America/Atikokan"
        | "America/Bahia"
        | "America/Bahia_Banderas"
        | "America/Barbados"
        | "America/Belem"
        | "America/Belize"
        | "America/Blanc-Sablon"
        | "America/Boa_Vista"
        | "America/Bogota"
        | "America/Boise"
        | "America/Cambridge_Bay"
        | "America/Campo_Grande"
        | "America/Cancun"
        | "America/Caracas"
        | "America/Cayenne"
        | "America/Cayman"
        | "America/Chicago"
        | "America/Chihuahua"
        | "America/Ciudad_Juarez"
        | "America/Costa_Rica"
        | "America/Creston"
        | "America/Cuiaba"
        | "America/Curacao"
        | "America/Danmarkshavn"
        | "America/Dawson"
        | "America/Dawson_Creek"
        | "America/Denver"
        | "America/Detroit"
        | "America/Dominica"
        | "America/Edmonton"
        | "America/Eirunepe"
        | "America/El_Salvador"
        | "America/Fort_Nelson"
        | "America/Fortaleza"
        | "America/Glace_Bay"
        | "America/Goose_Bay"
        | "America/Grand_Turk"
        | "America/Grenada"
        | "America/Guadeloupe"
        | "America/Guatemala"
        | "America/Guayaquil"
        | "America/Guyana"
        | "America/Halifax"
        | "America/Havana"
        | "America/Hermosillo"
        | "America/Indiana/Indianapolis"
        | "America/Indiana/Knox"
        | "America/Indiana/Marengo"
        | "America/Indiana/Petersburg"
        | "America/Indiana/Tell_City"
        | "America/Indiana/Vevay"
        | "America/Indiana/Vincennes"
        | "America/Indiana/Winamac"
        | "America/Inuvik"
        | "America/Iqaluit"
        | "America/Jamaica"
        | "America/Juneau"
        | "America/Kentucky/Louisville"
        | "America/Kentucky/Monticello"
        | "America/Kralendijk"
        | "America/La_Paz"
        | "America/Lima"
        | "America/Los_Angeles"
        | "America/Lower_Princes"
        | "America/Maceio"
        | "America/Managua"
        | "America/Manaus"
        | "America/Marigot"
        | "America/Martinique"
        | "America/Matamoros"
        | "America/Mazatlan"
        | "America/Menominee"
        | "America/Merida"
        | "America/Metlakatla"
        | "America/Mexico_City"
        | "America/Miquelon"
        | "America/Moncton"
        | "America/Monterrey"
        | "America/Montevideo"
        | "America/Montserrat"
        | "America/Nassau"
        | "America/New_York"
        | "America/Nome"
        | "America/Noronha"
        | "America/North_Dakota/Beulah"
        | "America/North_Dakota/Center"
        | "America/North_Dakota/New_Salem"
        | "America/Nuuk"
        | "America/Ojinaga"
        | "America/Panama"
        | "America/Paramaribo"
        | "America/Phoenix"
        | "America/Port-au-Prince"
        | "America/Port_of_Spain"
        | "America/Porto_Velho"
        | "America/Puerto_Rico"
        | "America/Punta_Arenas"
        | "America/Rankin_Inlet"
        | "America/Recife"
        | "America/Regina"
        | "America/Resolute"
        | "America/Rio_Branco"
        | "America/Santarem"
        | "America/Santiago"
        | "America/Santo_Domingo"
        | "America/Sao_Paulo"
        | "America/Scoresbysund"
        | "America/Sitka"
        | "America/St_Barthelemy"
        | "America/St_Johns"
        | "America/St_Kitts"
        | "America/St_Lucia"
        | "America/St_Thomas"
        | "America/St_Vincent"
        | "America/Swift_Current"
        | "America/Tegucigalpa"
        | "America/Thule"
        | "America/Tijuana"
        | "America/Toronto"
        | "America/Tortola"
        | "America/Vancouver"
        | "America/Whitehorse"
        | "America/Winnipeg"
        | "America/Yakutat"
        | "Antarctica/Casey"
        | "Antarctica/Davis"
        | "Antarctica/DumontDUrville"
        | "Antarctica/Macquarie"
        | "Antarctica/Mawson"
        | "Antarctica/McMurdo"
        | "Antarctica/Palmer"
        | "Antarctica/Rothera"
        | "Antarctica/Syowa"
        | "Antarctica/Troll"
        | "Antarctica/Vostok"
        | "Arctic/Longyearbyen"
        | "Asia/Aden"
        | "Asia/Almaty"
        | "Asia/Amman"
        | "Asia/Anadyr"
        | "Asia/Aqtau"
        | "Asia/Aqtobe"
        | "Asia/Ashgabat"
        | "Asia/Atyrau"
        | "Asia/Baghdad"
        | "Asia/Bahrain"
        | "Asia/Baku"
        | "Asia/Bangkok"
        | "Asia/Barnaul"
        | "Asia/Beirut"
        | "Asia/Bishkek"
        | "Asia/Brunei"
        | "Asia/Chita"
        | "Asia/Choibalsan"
        | "Asia/Colombo"
        | "Asia/Damascus"
        | "Asia/Dhaka"
        | "Asia/Dili"
        | "Asia/Dubai"
        | "Asia/Dushanbe"
        | "Asia/Famagusta"
        | "Asia/Gaza"
        | "Asia/Hebron"
        | "Asia/Ho_Chi_Minh"
        | "Asia/Hong_Kong"
        | "Asia/Hovd"
        | "Asia/Irkutsk"
        | "Asia/Jakarta"
        | "Asia/Jayapura"
        | "Asia/Jerusalem"
        | "Asia/Kabul"
        | "Asia/Kamchatka"
        | "Asia/Karachi"
        | "Asia/Kathmandu"
        | "Asia/Khandyga"
        | "Asia/Kolkata"
        | "Asia/Krasnoyarsk"
        | "Asia/Kuala_Lumpur"
        | "Asia/Kuching"
        | "Asia/Kuwait"
        | "Asia/Macau"
        | "Asia/Magadan"
        | "Asia/Makassar"
        | "Asia/Manila"
        | "Asia/Muscat"
        | "Asia/Nicosia"
        | "Asia/Novokuznetsk"
        | "Asia/Novosibirsk"
        | "Asia/Omsk"
        | "Asia/Oral"
        | "Asia/Phnom_Penh"
        | "Asia/Pontianak"
        | "Asia/Pyongyang"
        | "Asia/Qatar"
        | "Asia/Qostanay"
        | "Asia/Qyzylorda"
        | "Asia/Riyadh"
        | "Asia/Sakhalin"
        | "Asia/Samarkand"
        | "Asia/Seoul"
        | "Asia/Shanghai"
        | "Asia/Singapore"
        | "Asia/Srednekolymsk"
        | "Asia/Taipei"
        | "Asia/Tashkent"
        | "Asia/Tbilisi"
        | "Asia/Tehran"
        | "Asia/Thimphu"
        | "Asia/Tokyo"
        | "Asia/Tomsk"
        | "Asia/Ulaanbaatar"
        | "Asia/Urumqi"
        | "Asia/Ust-Nera"
        | "Asia/Vientiane"
        | "Asia/Vladivostok"
        | "Asia/Yakutsk"
        | "Asia/Yangon"
        | "Asia/Yekaterinburg"
        | "Asia/Yerevan"
        | "Atlantic/Azores"
        | "Atlantic/Bermuda"
        | "Atlantic/Canary"
        | "Atlantic/Cape_Verde"
        | "Atlantic/Faroe"
        | "Atlantic/Madeira"
        | "Atlantic/Reykjavik"
        | "Atlantic/South_Georgia"
        | "Atlantic/St_Helena"
        | "Atlantic/Stanley"
        | "Australia/Adelaide"
        | "Australia/Brisbane"
        | "Australia/Broken_Hill"
        | "Australia/Darwin"
        | "Australia/Eucla"
        | "Australia/Hobart"
        | "Australia/Lindeman"
        | "Australia/Lord_Howe"
        | "Australia/Melbourne"
        | "Australia/Perth"
        | "Australia/Sydney"
        | "Europe/Amsterdam"
        | "Europe/Andorra"
        | "Europe/Astrakhan"
        | "Europe/Athens"
        | "Europe/Belgrade"
        | "Europe/Berlin"
        | "Europe/Bratislava"
        | "Europe/Brussels"
        | "Europe/Bucharest"
        | "Europe/Budapest"
        | "Europe/Busingen"
        | "Europe/Chisinau"
        | "Europe/Copenhagen"
        | "Europe/Dublin"
        | "Europe/Gibraltar"
        | "Europe/Guernsey"
        | "Europe/Helsinki"
        | "Europe/Isle_of_Man"
        | "Europe/Istanbul"
        | "Europe/Jersey"
        | "Europe/Kaliningrad"
        | "Europe/Kirov"
        | "Europe/Kyiv"
        | "Europe/Lisbon"
        | "Europe/Ljubljana"
        | "Europe/London"
        | "Europe/Luxembourg"
        | "Europe/Madrid"
        | "Europe/Malta"
        | "Europe/Mariehamn"
        | "Europe/Minsk"
        | "Europe/Monaco"
        | "Europe/Moscow"
        | "Europe/Oslo"
        | "Europe/Paris"
        | "Europe/Podgorica"
        | "Europe/Prague"
        | "Europe/Riga"
        | "Europe/Rome"
        | "Europe/Samara"
        | "Europe/San_Marino"
        | "Europe/Sarajevo"
        | "Europe/Saratov"
        | "Europe/Simferopol"
        | "Europe/Skopje"
        | "Europe/Sofia"
        | "Europe/Stockholm"
        | "Europe/Tallinn"
        | "Europe/Tirane"
        | "Europe/Ulyanovsk"
        | "Europe/Vaduz"
        | "Europe/Vatican"
        | "Europe/Vienna"
        | "Europe/Vilnius"
        | "Europe/Volgograd"
        | "Europe/Warsaw"
        | "Europe/Zagreb"
        | "Europe/Zurich"
        | "Indian/Antananarivo"
        | "Indian/Chagos"
        | "Indian/Christmas"
        | "Indian/Cocos"
        | "Indian/Comoro"
        | "Indian/Kerguelen"
        | "Indian/Mahe"
        | "Indian/Maldives"
        | "Indian/Mauritius"
        | "Indian/Mayotte"
        | "Indian/Reunion"
        | "Pacific/Apia"
        | "Pacific/Auckland"
        | "Pacific/Bougainville"
        | "Pacific/Chatham"
        | "Pacific/Chuuk"
        | "Pacific/Easter"
        | "Pacific/Efate"
        | "Pacific/Fakaofo"
        | "Pacific/Fiji"
        | "Pacific/Funafuti"
        | "Pacific/Galapagos"
        | "Pacific/Gambier"
        | "Pacific/Guadalcanal"
        | "Pacific/Guam"
        | "Pacific/Honolulu"
        | "Pacific/Kanton"
        | "Pacific/Kiritimati"
        | "Pacific/Kosrae"
        | "Pacific/Kwajalein"
        | "Pacific/Majuro"
        | "Pacific/Marquesas"
        | "Pacific/Midway"
        | "Pacific/Nauru"
        | "Pacific/Niue"
        | "Pacific/Norfolk"
        | "Pacific/Noumea"
        | "Pacific/Pago_Pago"
        | "Pacific/Palau"
        | "Pacific/Pitcairn"
        | "Pacific/Pohnpei"
        | "Pacific/Port_Moresby"
        | "Pacific/Rarotonga"
        | "Pacific/Saipan"
        | "Pacific/Tahiti"
        | "Pacific/Tarawa"
        | "Pacific/Tongatapu"
        | "Pacific/Wake"
        | "Pacific/Wallis"
        | "UTC"
      workpsace_user_roles: "owner" | "manager" | "designer" | "client"
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
      task_types: ["image"],
      timezones: [
        "Africa/Abidjan",
        "Africa/Accra",
        "Africa/Addis_Ababa",
        "Africa/Algiers",
        "Africa/Asmara",
        "Africa/Bamako",
        "Africa/Bangui",
        "Africa/Banjul",
        "Africa/Bissau",
        "Africa/Blantyre",
        "Africa/Brazzaville",
        "Africa/Bujumbura",
        "Africa/Cairo",
        "Africa/Casablanca",
        "Africa/Ceuta",
        "Africa/Conakry",
        "Africa/Dakar",
        "Africa/Dar_es_Salaam",
        "Africa/Djibouti",
        "Africa/Douala",
        "Africa/El_Aaiun",
        "Africa/Freetown",
        "Africa/Gaborone",
        "Africa/Harare",
        "Africa/Johannesburg",
        "Africa/Juba",
        "Africa/Kampala",
        "Africa/Khartoum",
        "Africa/Kigali",
        "Africa/Kinshasa",
        "Africa/Lagos",
        "Africa/Libreville",
        "Africa/Lome",
        "Africa/Luanda",
        "Africa/Lubumbashi",
        "Africa/Lusaka",
        "Africa/Malabo",
        "Africa/Maputo",
        "Africa/Maseru",
        "Africa/Mbabane",
        "Africa/Mogadishu",
        "Africa/Monrovia",
        "Africa/Nairobi",
        "Africa/Ndjamena",
        "Africa/Niamey",
        "Africa/Nouakchott",
        "Africa/Ouagadougou",
        "Africa/Porto-Novo",
        "Africa/Sao_Tome",
        "Africa/Tripoli",
        "Africa/Tunis",
        "Africa/Windhoek",
        "America/Adak",
        "America/Anchorage",
        "America/Anguilla",
        "America/Antigua",
        "America/Araguaina",
        "America/Argentina/Buenos_Aires",
        "America/Argentina/Catamarca",
        "America/Argentina/Cordoba",
        "America/Argentina/Jujuy",
        "America/Argentina/La_Rioja",
        "America/Argentina/Mendoza",
        "America/Argentina/Rio_Gallegos",
        "America/Argentina/Salta",
        "America/Argentina/San_Juan",
        "America/Argentina/San_Luis",
        "America/Argentina/Tucuman",
        "America/Argentina/Ushuaia",
        "America/Aruba",
        "America/Asuncion",
        "America/Atikokan",
        "America/Bahia",
        "America/Bahia_Banderas",
        "America/Barbados",
        "America/Belem",
        "America/Belize",
        "America/Blanc-Sablon",
        "America/Boa_Vista",
        "America/Bogota",
        "America/Boise",
        "America/Cambridge_Bay",
        "America/Campo_Grande",
        "America/Cancun",
        "America/Caracas",
        "America/Cayenne",
        "America/Cayman",
        "America/Chicago",
        "America/Chihuahua",
        "America/Ciudad_Juarez",
        "America/Costa_Rica",
        "America/Creston",
        "America/Cuiaba",
        "America/Curacao",
        "America/Danmarkshavn",
        "America/Dawson",
        "America/Dawson_Creek",
        "America/Denver",
        "America/Detroit",
        "America/Dominica",
        "America/Edmonton",
        "America/Eirunepe",
        "America/El_Salvador",
        "America/Fort_Nelson",
        "America/Fortaleza",
        "America/Glace_Bay",
        "America/Goose_Bay",
        "America/Grand_Turk",
        "America/Grenada",
        "America/Guadeloupe",
        "America/Guatemala",
        "America/Guayaquil",
        "America/Guyana",
        "America/Halifax",
        "America/Havana",
        "America/Hermosillo",
        "America/Indiana/Indianapolis",
        "America/Indiana/Knox",
        "America/Indiana/Marengo",
        "America/Indiana/Petersburg",
        "America/Indiana/Tell_City",
        "America/Indiana/Vevay",
        "America/Indiana/Vincennes",
        "America/Indiana/Winamac",
        "America/Inuvik",
        "America/Iqaluit",
        "America/Jamaica",
        "America/Juneau",
        "America/Kentucky/Louisville",
        "America/Kentucky/Monticello",
        "America/Kralendijk",
        "America/La_Paz",
        "America/Lima",
        "America/Los_Angeles",
        "America/Lower_Princes",
        "America/Maceio",
        "America/Managua",
        "America/Manaus",
        "America/Marigot",
        "America/Martinique",
        "America/Matamoros",
        "America/Mazatlan",
        "America/Menominee",
        "America/Merida",
        "America/Metlakatla",
        "America/Mexico_City",
        "America/Miquelon",
        "America/Moncton",
        "America/Monterrey",
        "America/Montevideo",
        "America/Montserrat",
        "America/Nassau",
        "America/New_York",
        "America/Nome",
        "America/Noronha",
        "America/North_Dakota/Beulah",
        "America/North_Dakota/Center",
        "America/North_Dakota/New_Salem",
        "America/Nuuk",
        "America/Ojinaga",
        "America/Panama",
        "America/Paramaribo",
        "America/Phoenix",
        "America/Port-au-Prince",
        "America/Port_of_Spain",
        "America/Porto_Velho",
        "America/Puerto_Rico",
        "America/Punta_Arenas",
        "America/Rankin_Inlet",
        "America/Recife",
        "America/Regina",
        "America/Resolute",
        "America/Rio_Branco",
        "America/Santarem",
        "America/Santiago",
        "America/Santo_Domingo",
        "America/Sao_Paulo",
        "America/Scoresbysund",
        "America/Sitka",
        "America/St_Barthelemy",
        "America/St_Johns",
        "America/St_Kitts",
        "America/St_Lucia",
        "America/St_Thomas",
        "America/St_Vincent",
        "America/Swift_Current",
        "America/Tegucigalpa",
        "America/Thule",
        "America/Tijuana",
        "America/Toronto",
        "America/Tortola",
        "America/Vancouver",
        "America/Whitehorse",
        "America/Winnipeg",
        "America/Yakutat",
        "Antarctica/Casey",
        "Antarctica/Davis",
        "Antarctica/DumontDUrville",
        "Antarctica/Macquarie",
        "Antarctica/Mawson",
        "Antarctica/McMurdo",
        "Antarctica/Palmer",
        "Antarctica/Rothera",
        "Antarctica/Syowa",
        "Antarctica/Troll",
        "Antarctica/Vostok",
        "Arctic/Longyearbyen",
        "Asia/Aden",
        "Asia/Almaty",
        "Asia/Amman",
        "Asia/Anadyr",
        "Asia/Aqtau",
        "Asia/Aqtobe",
        "Asia/Ashgabat",
        "Asia/Atyrau",
        "Asia/Baghdad",
        "Asia/Bahrain",
        "Asia/Baku",
        "Asia/Bangkok",
        "Asia/Barnaul",
        "Asia/Beirut",
        "Asia/Bishkek",
        "Asia/Brunei",
        "Asia/Chita",
        "Asia/Choibalsan",
        "Asia/Colombo",
        "Asia/Damascus",
        "Asia/Dhaka",
        "Asia/Dili",
        "Asia/Dubai",
        "Asia/Dushanbe",
        "Asia/Famagusta",
        "Asia/Gaza",
        "Asia/Hebron",
        "Asia/Ho_Chi_Minh",
        "Asia/Hong_Kong",
        "Asia/Hovd",
        "Asia/Irkutsk",
        "Asia/Jakarta",
        "Asia/Jayapura",
        "Asia/Jerusalem",
        "Asia/Kabul",
        "Asia/Kamchatka",
        "Asia/Karachi",
        "Asia/Kathmandu",
        "Asia/Khandyga",
        "Asia/Kolkata",
        "Asia/Krasnoyarsk",
        "Asia/Kuala_Lumpur",
        "Asia/Kuching",
        "Asia/Kuwait",
        "Asia/Macau",
        "Asia/Magadan",
        "Asia/Makassar",
        "Asia/Manila",
        "Asia/Muscat",
        "Asia/Nicosia",
        "Asia/Novokuznetsk",
        "Asia/Novosibirsk",
        "Asia/Omsk",
        "Asia/Oral",
        "Asia/Phnom_Penh",
        "Asia/Pontianak",
        "Asia/Pyongyang",
        "Asia/Qatar",
        "Asia/Qostanay",
        "Asia/Qyzylorda",
        "Asia/Riyadh",
        "Asia/Sakhalin",
        "Asia/Samarkand",
        "Asia/Seoul",
        "Asia/Shanghai",
        "Asia/Singapore",
        "Asia/Srednekolymsk",
        "Asia/Taipei",
        "Asia/Tashkent",
        "Asia/Tbilisi",
        "Asia/Tehran",
        "Asia/Thimphu",
        "Asia/Tokyo",
        "Asia/Tomsk",
        "Asia/Ulaanbaatar",
        "Asia/Urumqi",
        "Asia/Ust-Nera",
        "Asia/Vientiane",
        "Asia/Vladivostok",
        "Asia/Yakutsk",
        "Asia/Yangon",
        "Asia/Yekaterinburg",
        "Asia/Yerevan",
        "Atlantic/Azores",
        "Atlantic/Bermuda",
        "Atlantic/Canary",
        "Atlantic/Cape_Verde",
        "Atlantic/Faroe",
        "Atlantic/Madeira",
        "Atlantic/Reykjavik",
        "Atlantic/South_Georgia",
        "Atlantic/St_Helena",
        "Atlantic/Stanley",
        "Australia/Adelaide",
        "Australia/Brisbane",
        "Australia/Broken_Hill",
        "Australia/Darwin",
        "Australia/Eucla",
        "Australia/Hobart",
        "Australia/Lindeman",
        "Australia/Lord_Howe",
        "Australia/Melbourne",
        "Australia/Perth",
        "Australia/Sydney",
        "Europe/Amsterdam",
        "Europe/Andorra",
        "Europe/Astrakhan",
        "Europe/Athens",
        "Europe/Belgrade",
        "Europe/Berlin",
        "Europe/Bratislava",
        "Europe/Brussels",
        "Europe/Bucharest",
        "Europe/Budapest",
        "Europe/Busingen",
        "Europe/Chisinau",
        "Europe/Copenhagen",
        "Europe/Dublin",
        "Europe/Gibraltar",
        "Europe/Guernsey",
        "Europe/Helsinki",
        "Europe/Isle_of_Man",
        "Europe/Istanbul",
        "Europe/Jersey",
        "Europe/Kaliningrad",
        "Europe/Kirov",
        "Europe/Kyiv",
        "Europe/Lisbon",
        "Europe/Ljubljana",
        "Europe/London",
        "Europe/Luxembourg",
        "Europe/Madrid",
        "Europe/Malta",
        "Europe/Mariehamn",
        "Europe/Minsk",
        "Europe/Monaco",
        "Europe/Moscow",
        "Europe/Oslo",
        "Europe/Paris",
        "Europe/Podgorica",
        "Europe/Prague",
        "Europe/Riga",
        "Europe/Rome",
        "Europe/Samara",
        "Europe/San_Marino",
        "Europe/Sarajevo",
        "Europe/Saratov",
        "Europe/Simferopol",
        "Europe/Skopje",
        "Europe/Sofia",
        "Europe/Stockholm",
        "Europe/Tallinn",
        "Europe/Tirane",
        "Europe/Ulyanovsk",
        "Europe/Vaduz",
        "Europe/Vatican",
        "Europe/Vienna",
        "Europe/Vilnius",
        "Europe/Volgograd",
        "Europe/Warsaw",
        "Europe/Zagreb",
        "Europe/Zurich",
        "Indian/Antananarivo",
        "Indian/Chagos",
        "Indian/Christmas",
        "Indian/Cocos",
        "Indian/Comoro",
        "Indian/Kerguelen",
        "Indian/Mahe",
        "Indian/Maldives",
        "Indian/Mauritius",
        "Indian/Mayotte",
        "Indian/Reunion",
        "Pacific/Apia",
        "Pacific/Auckland",
        "Pacific/Bougainville",
        "Pacific/Chatham",
        "Pacific/Chuuk",
        "Pacific/Easter",
        "Pacific/Efate",
        "Pacific/Fakaofo",
        "Pacific/Fiji",
        "Pacific/Funafuti",
        "Pacific/Galapagos",
        "Pacific/Gambier",
        "Pacific/Guadalcanal",
        "Pacific/Guam",
        "Pacific/Honolulu",
        "Pacific/Kanton",
        "Pacific/Kiritimati",
        "Pacific/Kosrae",
        "Pacific/Kwajalein",
        "Pacific/Majuro",
        "Pacific/Marquesas",
        "Pacific/Midway",
        "Pacific/Nauru",
        "Pacific/Niue",
        "Pacific/Norfolk",
        "Pacific/Noumea",
        "Pacific/Pago_Pago",
        "Pacific/Palau",
        "Pacific/Pitcairn",
        "Pacific/Pohnpei",
        "Pacific/Port_Moresby",
        "Pacific/Rarotonga",
        "Pacific/Saipan",
        "Pacific/Tahiti",
        "Pacific/Tarawa",
        "Pacific/Tongatapu",
        "Pacific/Wake",
        "Pacific/Wallis",
        "UTC",
      ],
      workpsace_user_roles: ["owner", "manager", "designer", "client"],
    },
  },
} as const

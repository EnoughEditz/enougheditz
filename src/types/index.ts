export type VideoCategory = 'all' | 'maps' | 'retention' | 'reels' | 'motion' | 'sound';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string; // Drive link, YouTube embed, or preview URL
  embedUrl?: string;
  thumb?: string;
  category: VideoCategory;
  categoryLabel?: string;
  aspectRatio: '9:16' | '16:9';
  duration: string;
  views?: string;
  retentionStat?: string;
  tools: string[];
  clientOrTheme?: string;
  featured?: boolean;
}

export interface CategoryTab {
  id: string;
  label: string;
  folderUrl?: string;
  count?: number;
  description?: string;
}

export interface SoftwareTool {
  name: string;
  role: string;
  url: string;
  icon: string;
  specialty: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  channelOrBrand: string;
  avatar: string;
  metric: string;
  quote: string;
  videoType: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

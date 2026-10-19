import { VideoItem, CategoryTab, SoftwareTool, Testimonial, WorkflowStep } from '../types';

export const STUDIO_INFO = {
  name: "Enough Editz",
  creator: "Aditya Anil Khekade",
  role: "Video Editor & Motion Designer",
  location: "Brahmapuri, Maharashtra, India",
  email: "adityaanilkhekade@gmail.com",
  avatar: "https://ui-avatars.com/api/?name=Aditya+Khekade&background=1d1d1f&color=fff&rounded=true&size=256&bold=true&font-size=0.4",
  logo: "https://ui-avatars.com/api/?name=EE&background=0071e3&color=fff&rounded=true&size=256&bold=true&font-size=0.45",
  fiverrUrl: "https://www.fiverr.com",
  youtubeUrl: "https://www.youtube.com/@EnoughEditz",
  instagramUrl: "https://www.instagram.com",
  tagline: "Motion made to hold attention.",
  bio: "I turn complex narratives into seamless, scroll-stopping video assets. From geo-animated maps built with GeoLayers 3 and Blender to frame-perfect documentary motion graphics — every cut is crafted for maximum retention on the modern digital landscape."
};

export const INITIAL_CATEGORIES: CategoryTab[] = [
  { id: "all", label: "All Projects" },
  { id: "maps", label: "Map Animation", folderUrl: "https://drive.google.com" },
  { id: "retention", label: "High-Retention Edits", folderUrl: "https://drive.google.com" },
  { id: "reels", label: "Viral Reels & Shorts", folderUrl: "https://drive.google.com" },
  { id: "motion", label: "Motion Graphics & 3D", folderUrl: "https://drive.google.com" },
  { id: "sound", label: "Sound Design", folderUrl: "https://drive.google.com" }
];

export const PORTFOLIO_VIDEOS: VideoItem[] = [
  {
    id: "v-map-1",
    title: "Spain Under Muslim Rule — 3D Terrain & Caliphate Expansion",
    description: "Detailed historical geopolitical map animation tracking the Umayyad conquest of Hispania. Built with realistic satellite elevation hillshading, kinetic border strokes, and custom Arabic calligraphy overlays.",
    url: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", // fallback player embed
    embedUrl: "https://www.youtube-nocookie.com/embed/E1Czmgk1nFc?autoplay=1&rel=0",
    thumb: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
    category: "maps",
    categoryLabel: "Map Animation",
    aspectRatio: "9:16",
    duration: "0:48",
    views: "1.4M+",
    retentionStat: "+74% at 30s",
    tools: ["After Effects", "GeoLayers 3", "MapTiler", "Blender 3D"],
    clientOrTheme: "History Documentary Channel",
    featured: true
  },
  {
    id: "v-retention-1",
    title: "Why Modern Algorithms Favor Chaos — YouTube Longform Cut",
    description: "Fast-paced video essay cut featuring kinetic typography, custom paper cutout textures, dynamic push-ins, and high-frequency sound design to eliminate pacing flatlines.",
    url: "https://www.youtube-nocookie.com/embed/7wtfhZwyrcc?autoplay=1&rel=0",
    embedUrl: "https://www.youtube-nocookie.com/embed/7wtfhZwyrcc?autoplay=1&rel=0",
    thumb: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    category: "retention",
    categoryLabel: "High-Retention Edits",
    aspectRatio: "9:16",
    duration: "1:14",
    views: "890K+",
    retentionStat: "68% Total Retention",
    tools: ["Premiere Pro", "After Effects", "Boris FX", "Audition"],
    clientOrTheme: "Tech Deep Dive Series",
    featured: true
  },
  {
    id: "v-map-2",
    title: "The Silk Road — Ancient Trade Routes & Desert Topography",
    description: "3D camera flyover from Xi'an through Central Asian mountain passes into the Mediterranean. Features animated caravans, isometric trading outpost callouts, and sandstorm VFX.",
    url: "https://www.youtube-nocookie.com/embed/kJQP7kiw5Fk?autoplay=1&rel=0",
    embedUrl: "https://www.youtube-nocookie.com/embed/kJQP7kiw5Fk?autoplay=1&rel=0",
    thumb: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    category: "maps",
    categoryLabel: "Map Animation",
    aspectRatio: "9:16",
    duration: "0:56",
    views: "2.1M+",
    retentionStat: "+82% Completion",
    tools: ["GeoLayers 3", "Blender", "After Effects", "Deep Glow"],
    clientOrTheme: "Geopolitics & Geography Hub",
    featured: true
  },
  {
    id: "v-reels-1",
    title: "The 3-Second Retention Rule — Viral Reel Breakdown",
    description: "High-voltage 9:16 short form video with instant hook visual design, bouncing captions, punchy SFX on every emphasis word, and split-screen asset compositing.",
    url: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1&rel=0",
    embedUrl: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1&rel=0",
    thumb: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    category: "reels",
    categoryLabel: "Viral Reels & Shorts",
    aspectRatio: "9:16",
    duration: "0:34",
    views: "3.8M+",
    retentionStat: "112% APV (Looping)",
    tools: ["Premiere Pro", "After Effects", "Mister Horse"],
    clientOrTheme: "Creator Brand Growth",
    featured: true
  },
  {
    id: "v-motion-1",
    title: "Fintech Dashboard Launch — Isometric 3D Explainer",
    description: "Clean vector illustrations animated in 3D isometric space, displaying real-time data transactions, glowing glass cards, and fluid camera tracking.",
    url: "https://www.youtube-nocookie.com/embed/EngW7tLk6R8?autoplay=1&rel=0",
    embedUrl: "https://www.youtube-nocookie.com/embed/EngW7tLk6R8?autoplay=1&rel=0",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    category: "motion",
    categoryLabel: "Motion Graphics & 3D",
    aspectRatio: "9:16",
    duration: "0:42",
    views: "450K+",
    retentionStat: "94% Click-to-End",
    tools: ["Illustrator", "After Effects", "Cinema 4D"],
    clientOrTheme: "SaaS Product Demo",
    featured: false
  },
  {
    id: "v-map-3",
    title: "Siege of Constantinople (1453) — Golden Horn Naval Maneuver",
    description: "Tactical military mapping displaying the Ottoman ships hauled overland into the Golden Horn. Includes elevation profiles, troop count counters, and battle heatmaps.",
    url: "https://www.youtube-nocookie.com/embed/fJ9rUzIMcZQ?autoplay=1&rel=0",
    embedUrl: "https://www.youtube-nocookie.com/embed/fJ9rUzIMcZQ?autoplay=1&rel=0",
    thumb: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    category: "maps",
    categoryLabel: "Map Animation",
    aspectRatio: "9:16",
    duration: "1:05",
    views: "1.9M+",
    retentionStat: "+69% Watch Time",
    tools: ["GeoLayers 3", "Photoshop", "After Effects"],
    clientOrTheme: "Military History Channel",
    featured: false
  },
  {
    id: "v-sound-1",
    title: "Cinematic Sound Redesign — Whooshes, Risers & Bass Hits",
    description: "Audio-driven showreel demonstrating how sound design controls viewer focus. Multi-track stem mixing with custom recorded foley, sub drops, and analog synth risers.",
    url: "https://www.youtube-nocookie.com/embed/21X5lGlDOfg?autoplay=1&rel=0",
    embedUrl: "https://www.youtube-nocookie.com/embed/21X5lGlDOfg?autoplay=1&rel=0",
    thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    category: "sound",
    categoryLabel: "Sound Design",
    aspectRatio: "9:16",
    duration: "0:39",
    views: "620K+",
    retentionStat: "Precision Audio Sync",
    tools: ["DaVinci Resolve Fairlight", "Audition", "Serum"],
    clientOrTheme: "Sound Showcase",
    featured: false
  },
  {
    id: "v-retention-2",
    title: "The Architecture of a 10M View Talking Head Video",
    description: "Deconstructing a dry monologue into a gripping visual documentary using b-roll collage, archival zoom-ins, and animated highlighted news clippings.",
    url: "https://www.youtube-nocookie.com/embed/lTRiuFIWV54?autoplay=1&rel=0",
    embedUrl: "https://www.youtube-nocookie.com/embed/lTRiuFIWV54?autoplay=1&rel=0",
    thumb: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
    category: "retention",
    categoryLabel: "High-Retention Edits",
    aspectRatio: "9:16",
    duration: "1:22",
    views: "2.7M+",
    retentionStat: "+78% Relative Retention",
    tools: ["Premiere Pro", "After Effects", "Photoshop"],
    clientOrTheme: "Economics Explainer",
    featured: false
  }
];

export const SOFTWARE_TOOLS: SoftwareTool[] = [
  {
    name: "After Effects",
    role: "Motion Graphics & Compositing",
    url: "https://www.adobe.com/products/aftereffects.html",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
    specialty: "GeoLayers 3, 3D Camera tracking, Boris FX, Deep Glow & kinetic typography.",
    badge: "Primary Engine"
  },
  {
    name: "Premiere Pro",
    role: "Pacing & Assembly Editing",
    url: "https://www.adobe.com/products/premiere.html",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
    specialty: "High-speed timeline trimming, multi-cam sync, pacing rhythm, and color conform.",
    badge: "Editorial Core"
  },
  {
    name: "Illustrator",
    role: "Vector Cartography & Assets",
    url: "https://www.adobe.com/products/illustrator.html",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
    specialty: "Custom border vectors, icons, historical flags, infographics, and map layers.",
    badge: "Vector Design"
  },
  {
    name: "Blender",
    role: "3D Environments & Terrain",
    url: "https://www.blender.org/",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg",
    specialty: "DEM heightmap displacement, 3D terrain flyovers, lighting, and camera paths.",
    badge: "3D Specialist"
  },
  {
    name: "DaVinci Resolve",
    role: "Color Grading & Fairlight Audio",
    url: "https://www.blackmagicdesign.com/products/davinciresolve",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",
    specialty: "Film emulation looks, saturation management, stem mixing & sub-bass mastering.",
    badge: "Color & Audio"
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Retention & Pacing Blueprint",
    subtitle: "Eliminating drop-off points before touching the timeline",
    description: "We analyze your raw recording or script to pinpoint viewer fatigue zones. We create a pacing map deciding where pattern interrupts, zooms, and map sequences belong.",
    deliverables: ["Pacing script markup", "Visual reference deck", "Tone & asset alignment"]
  },
  {
    step: "02",
    title: "3D Geo & Asset Pre-Production",
    subtitle: "Custom cartography and bespoke visual elements",
    description: "Using GeoLayers 3 and Blender, we source satellite DEM data and craft historical or geopolitical borders, battle movements, and custom vector callouts.",
    deliverables: ["High-res geo layers", "Bespoke vector icons", "Custom 3D camera tracks"]
  },
  {
    step: "03",
    title: "Motion Animation & Compositing",
    subtitle: "Pixel-perfect motion with zero AI artifacts",
    description: "In After Effects, every subtitle bounce, map flyover, paper texture, and graph animation is hand-crafted with custom easing curves for a cinematic, tactile feel.",
    deliverables: ["Kinetic typography", "Seamless transitions", "Layered graphic compositing"]
  },
  {
    step: "04",
    title: "Precision Sound Design",
    subtitle: "The unseen 50% of viewer retention",
    description: "We layer hundreds of subtle audio triggers — tactile clicks, deep cinematic braams, low-end risers, air swooshes, and paper crinkles — mixed so they don't overpower the vocal.",
    deliverables: ["Multi-stem audio mix", "Dialogue cleanup", "Bespoke sound FX placement"]
  },
  {
    step: "05",
    title: "Final Polish & Retention Review",
    subtitle: "Delivery in 4K with timeline revisions",
    description: "Color-graded for maximum punch on OLED and mobile screens, exported with YouTube/Reels optimized bitrate settings, ready to publish.",
    deliverables: ["ProRes / 4K H.264 export", "Reels/Shorts 9:16 cuts", "Fast turnaround revisions"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    clientName: "Marcus Sterling",
    channelOrBrand: "History Uncovered (720K Subs)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    metric: "+68% Retention at 3:00",
    quote: "Aditya's GeoLayers map animations completely elevated our channel's production value. Our viewer retention on complex geopolitical topics jumped immediately.",
    videoType: "Historical Map Animation"
  },
  {
    id: "t2",
    clientName: "David Chen",
    channelOrBrand: "Venture Metrics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    metric: "1.2M Average Views",
    quote: "He knows how to keep eyeballs glued. The combination of tactile sound effects and micro-animations turns a standard talking-head video into a cinema piece.",
    videoType: "High-Retention YouTube Longform"
  },
  {
    id: "t3",
    clientName: "Elena Rostova",
    channelOrBrand: "Alpha Media Agency",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    metric: "15M+ Views on Reels",
    quote: "Fast, receptive to feedback, and deeply understands digital creator pacing. Enough Editz is our secret weapon for client shorts.",
    videoType: "Viral Short-Form Motion"
  }
];

export const APPS_SCRIPT_TEMPLATE = `// =================================================================
// ENOUGH EDITZ - GOOGLE DRIVE SYNC APPS SCRIPT
// =================================================================
// 1. Go to script.google.com and create a new project.
// 2. Paste this code.
// 3. Replace ROOT_FOLDER_ID with the ID of your Google Drive portfolio folder.
// 4. Click 'Deploy' -> 'New Deployment' -> Type: 'Web app'.
// 5. Set 'Who has access' to 'Anyone'.
// 6. Copy the Web App URL and paste it into Enough Editz!
// =================================================================

const ROOT_FOLDER_ID = "PASTE_YOUR_ROOT_DRIVE_FOLDER_ID_HERE";

function doGet() {
  try {
    const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
    const subFolders = rootFolder.getFolders();
    const categories = [];

    while (subFolders.hasNext()) {
      const folder = subFolders.next();
      const folderName = folder.getName();
      const folderId = folder.getId();
      const folderUrl = folder.getUrl();
      
      const files = folder.getFiles();
      const videos = [];

      while (files.hasNext()) {
        const file = files.next();
        const mime = file.getMimeType();
        
        // Accept video files
        if (mime.indexOf('video') !== -1 || file.getName().endsWith('.mp4')) {
          videos.push({
            id: file.getId(),
            title: file.getName().replace(/\\.[^/.]+$/, ""),
            url: file.getUrl(),
            embedUrl: "https://drive.google.com/file/d/" + file.getId() + "/preview",
            thumb: "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w800",
            duration: "0:45",
            aspectRatio: "9:16"
          });
        }
      }

      categories.push({
        id: folderId,
        label: folderName,
        folderUrl: folderUrl,
        videos: videos
      });
    }

    const payload = JSON.stringify({
      status: "success",
      categories: categories
    });

    return ContentService.createTextOutput(payload)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
`;

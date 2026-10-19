export interface DriveVideo {
  id: string;
  title: string;
  url: string;
  thumb: string;
}

export interface DriveCategory {
  id: string;
  label: string;
  folderUrl: string;
  videos: DriveVideo[];
}

export const GDRIVE_ROOT_FOLDER_ID = "1SG65fVDS0ZnfQxnsQyjuKBnm8rpQMASY";
export const GDRIVE_ROOT_FOLDER_URL = "https://drive.google.com/drive/folders/1SG65fVDS0ZnfQxnsQyjuKBnm8rpQMASY";

export const INITIAL_DRIVE_CATEGORIES: DriveCategory[] = [
  {
    id: "1yrenEvYv5eLezcsf0nUl5pq4SxYb4oUX",
    label: "map animation",
    folderUrl: "https://drive.google.com/drive/folders/1yrenEvYv5eLezcsf0nUl5pq4SxYb4oUX",
    videos: [
      {
        id: "1U20ClWLF58QjdelvkVxlC2jnEZbfEGZf",
        title: "Australia Capital",
        url: "https://drive.google.com/file/d/1U20ClWLF58QjdelvkVxlC2jnEZbfEGZf/preview",
        thumb: "https://lh3.googleusercontent.com/d/1U20ClWLF58QjdelvkVxlC2jnEZbfEGZf=w800"
      },
      {
        id: "1xnrKedsWMzFRz-Nac0TUQSNoeyUfmoSw",
        title: "East & West USA",
        url: "https://drive.google.com/file/d/1xnrKedsWMzFRz-Nac0TUQSNoeyUfmoSw/preview",
        thumb: "https://lh3.googleusercontent.com/d/1xnrKedsWMzFRz-Nac0TUQSNoeyUfmoSw=w800"
      },
      {
        id: "1HsLYHGUn4tGboTzJ-OuszGMI1KCcaCSP",
        title: "Haitian Revolution",
        url: "https://drive.google.com/file/d/1HsLYHGUn4tGboTzJ-OuszGMI1KCcaCSP/preview",
        thumb: "https://lh3.googleusercontent.com/d/1HsLYHGUn4tGboTzJ-OuszGMI1KCcaCSP=w800"
      },
      {
        id: "19x02RlhNBvDEpqgAetfNUT5SoegZUjVx",
        title: "Hawaii Island",
        url: "https://drive.google.com/file/d/19x02RlhNBvDEpqgAetfNUT5SoegZUjVx/preview",
        thumb: "https://lh3.googleusercontent.com/d/19x02RlhNBvDEpqgAetfNUT5SoegZUjVx=w800"
      },
      {
        id: "1nSEuDl0o_rL0ljSYpjvujlR3NyDU50dB",
        title: "Morocco & Spain",
        url: "https://drive.google.com/file/d/1nSEuDl0o_rL0ljSYpjvujlR3NyDU50dB/preview",
        thumb: "https://lh3.googleusercontent.com/d/1nSEuDl0o_rL0ljSYpjvujlR3NyDU50dB=w800"
      },
      {
        id: "1PW4UYsWW5HWRWMm0eG1dmCyTJr67amDX",
        title: "new york tax",
        url: "https://drive.google.com/file/d/1PW4UYsWW5HWRWMm0eG1dmCyTJr67amDX/preview",
        thumb: "https://lh3.googleusercontent.com/d/1PW4UYsWW5HWRWMm0eG1dmCyTJr67amDX=w800"
      },
      {
        id: "1L6HOefHcliW90NVtJHO6U-dYjqDNP6d_",
        title: "Spain Under Muslim Rule",
        url: "https://drive.google.com/file/d/1L6HOefHcliW90NVtJHO6U-dYjqDNP6d_/preview",
        thumb: "https://lh3.googleusercontent.com/d/1L6HOefHcliW90NVtJHO6U-dYjqDNP6d_=w800"
      },
      {
        id: "19a9ffXObP2CVBJ7Z94UuoyVrjjTMmq08",
        title: "usa,panama,greenland",
        url: "https://drive.google.com/file/d/19a9ffXObP2CVBJ7Z94UuoyVrjjTMmq08/preview",
        thumb: "https://lh3.googleusercontent.com/d/19a9ffXObP2CVBJ7Z94UuoyVrjjTMmq08=w800"
      }
    ]
  },
  {
    id: "18MgyKw1YYnYU1ryBWojaaFSwAUhSEpmP",
    label: "explaner videos",
    folderUrl: "https://drive.google.com/drive/folders/18MgyKw1YYnYU1ryBWojaaFSwAUhSEpmP",
    videos: [
      {
        id: "1XKQyzHQIZeaNRlYxbc4R51rTWpLDV_Cp",
        title: "Copy of reel 04 cg",
        url: "https://drive.google.com/file/d/1XKQyzHQIZeaNRlYxbc4R51rTWpLDV_Cp/preview",
        thumb: "https://lh3.googleusercontent.com/d/1XKQyzHQIZeaNRlYxbc4R51rTWpLDV_Cp=w800"
      },
      {
        id: "1bq-QbHB0O9XAQIXG8vx6FU3bf5NnZmXy",
        title: "Copy of reel1 plot information",
        url: "https://drive.google.com/file/d/1bq-QbHB0O9XAQIXG8vx6FU3bf5NnZmXy/preview",
        thumb: "https://lh3.googleusercontent.com/d/1bq-QbHB0O9XAQIXG8vx6FU3bf5NnZmXy=w800"
      },
      {
        id: "1lIHr2v8d_tf9VCvfbjuoY-napzuterDf",
        title: "Copy of reel2_3",
        url: "https://drive.google.com/file/d/1lIHr2v8d_tf9VCvfbjuoY-napzuterDf/preview",
        thumb: "https://lh3.googleusercontent.com/d/1lIHr2v8d_tf9VCvfbjuoY-napzuterDf=w800"
      },
      {
        id: "1DOpc9wiQQl23Axf3pWEbkufR4L-LYbYU",
        title: "Copy of reel3_1",
        url: "https://drive.google.com/file/d/1DOpc9wiQQl23Axf3pWEbkufR4L-LYbYU/preview",
        thumb: "https://lh3.googleusercontent.com/d/1DOpc9wiQQl23Axf3pWEbkufR4L-LYbYU=w800"
      }
    ]
  },
  {
    id: "1zw0zzhSg9rZ-eel3eA8SYsiW-1A9pLuS",
    label: "sas animation",
    folderUrl: "https://drive.google.com/drive/folders/1zw0zzhSg9rZ-eel3eA8SYsiW-1A9pLuS",
    videos: [
      {
        id: "18lcDZeABAAbugAWz86W0Ukd_TqGUEXoj",
        title: "Mavio AI Meeting Notes — Turn Every Meeting Into Notes, Decisions & Action Items",
        url: "https://drive.google.com/file/d/18lcDZeABAAbugAWz86W0Ukd_TqGUEXoj/preview",
        thumb: "https://lh3.googleusercontent.com/d/18lcDZeABAAbugAWz86W0Ukd_TqGUEXoj=w800"
      },
      {
        id: "1omqkVE9sL9TedqInQghVd1Zkna_j_lw_",
        title: "Copy of Mavio AI Meeting Notes",
        url: "https://drive.google.com/file/d/1omqkVE9sL9TedqInQghVd1Zkna_j_lw_/preview",
        thumb: "https://lh3.googleusercontent.com/d/1omqkVE9sL9TedqInQghVd1Zkna_j_lw_=w800"
      },
      {
        id: "1AfY6IDVerEU7M-RI2YFZvSk_rxfZg2od",
        title: "Copy of Mavio AI Meeting Notes (Alt)",
        url: "https://drive.google.com/file/d/1AfY6IDVerEU7M-RI2YFZvSk_rxfZg2od/preview",
        thumb: "https://lh3.googleusercontent.com/d/1AfY6IDVerEU7M-RI2YFZvSk_rxfZg2od=w800"
      }
    ]
  },
  {
    id: "1PERv1fugD_fuwCM81fWeDOe5dc1nqaxO",
    label: "my own edits",
    folderUrl: "https://drive.google.com/drive/folders/1PERv1fugD_fuwCM81fWeDOe5dc1nqaxO",
    videos: [
      {
        id: "1horp00VkBEVIy8N89k3x_Oaq0J9eH26h",
        title: "Barfi !",
        url: "https://drive.google.com/file/d/1horp00VkBEVIy8N89k3x_Oaq0J9eH26h/preview",
        thumb: "https://lh3.googleusercontent.com/d/1horp00VkBEVIy8N89k3x_Oaq0J9eH26h=w800"
      },
      {
        id: "1z_RQh-Sg3BxPV8K0hMgyzPUsL_f5-fv7",
        title: "Her",
        url: "https://drive.google.com/file/d/1z_RQh-Sg3BxPV8K0hMgyzPUsL_f5-fv7/preview",
        thumb: "https://lh3.googleusercontent.com/d/1z_RQh-Sg3BxPV8K0hMgyzPUsL_f5-fv7=w800"
      },
      {
        id: "1XhZ9ZsjE0aRouzplsGPafx0FEo5gKtbt",
        title: "Kasooor",
        url: "https://drive.google.com/file/d/1XhZ9ZsjE0aRouzplsGPafx0FEo5gKtbt/preview",
        thumb: "https://lh3.googleusercontent.com/d/1XhZ9ZsjE0aRouzplsGPafx0FEo5gKtbt=w800"
      },
      {
        id: "1YnwwBLIStZYPcyAWEr9aZnBy46vOpY-f",
        title: "Shraddha Kapoor",
        url: "https://drive.google.com/file/d/1YnwwBLIStZYPcyAWEr9aZnBy46vOpY-f/preview",
        thumb: "https://lh3.googleusercontent.com/d/1YnwwBLIStZYPcyAWEr9aZnBy46vOpY-f=w800"
      }
    ]
  },
  {
    id: "19tJ_pK4GYL21UPHYbIWyC2iMktwHu4ys",
    label: "part time",
    folderUrl: "https://drive.google.com/drive/folders/19tJ_pK4GYL21UPHYbIWyC2iMktwHu4ys",
    videos: [
      {
        id: "1Ht7fsvF5l4W8xqys8LuxEE77AUsdWHVP",
        title: "3915f265-2aac-4cea-8932-2caec0c0fc16",
        url: "https://drive.google.com/file/d/1Ht7fsvF5l4W8xqys8LuxEE77AUsdWHVP/preview",
        thumb: "https://lh3.googleusercontent.com/d/1Ht7fsvF5l4W8xqys8LuxEE77AUsdWHVP=w800"
      },
      {
        id: "12JInqHWNyv7qeapLxonX29mNzKM7RrW4",
        title: "containing World Mapcomp_2 (1)",
        url: "https://drive.google.com/file/d/12JInqHWNyv7qeapLxonX29mNzKM7RrW4/preview",
        thumb: "https://lh3.googleusercontent.com/d/12JInqHWNyv7qeapLxonX29mNzKM7RrW4=w800"
      },
      {
        id: "1e4MNRzPAMMMzHKRl2LbRhI5pg4COoeN9",
        title: "hawaii",
        url: "https://drive.google.com/file/d/1e4MNRzPAMMMzHKRl2LbRhI5pg4COoeN9/preview",
        thumb: "https://lh3.googleusercontent.com/d/1e4MNRzPAMMMzHKRl2LbRhI5pg4COoeN9=w800"
      },
      {
        id: "1pEM2-4uuRiRNvwIOBckIXwFGjPIbYpwU",
        title: "russsia 2.0 with caption",
        url: "https://drive.google.com/file/d/1pEM2-4uuRiRNvwIOBckIXwFGjPIbYpwU/preview",
        thumb: "https://lh3.googleusercontent.com/d/1pEM2-4uuRiRNvwIOBckIXwFGjPIbYpwU=w800"
      }
    ]
  }
];

export interface Actor {
  urls: [[{ index: number; url: string; }],
         [{ index: number; url: string; }],
         [{ index: number; url: string; }],
         [{ index: number; url: string; }],
  ],
  pic: [{ index: number; url: string; },
        { index: number; url: string; },
        { index: number; url: string; },
        { index: number; url: string; }
  ],
  pixUrls: [[{ picIndex: number, index: number; src: string; }],
            [{ picIndex: number, index: number; src: string; }],
            [{ picIndex: number, index: number; src: string; }],
            [{ picIndex: number, index: number; src: string; }],
  ],
  pixValue: number[],
  display: number,
}
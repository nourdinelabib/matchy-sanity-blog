# Matchy Sanity Blog

A Sanity-powered blog built with Next.js 15, Tailwind CSS, and SanityPress template.

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd matchy-sanity-blog
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-01

# Base URL for your site
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: Sanity API read token (for production)
SANITY_API_READ_TOKEN=your_read_token_here
```

**To get your Sanity Project ID:**
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Find your project and copy the Project ID from the URL or project settings

**To get your Sanity API Read Token:**
1. In your Sanity project dashboard, go to API settings
2. Create a new token with "Viewer" permissions
3. Copy the generated token

### 3. Start Development Server

```bash
npm run dev
```

- **Website**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/admin

### 4. Import Demo Content (Optional)

To get started with sample content:

```bash
sanity dataset import src/sanity/demo.tar.gz
```

## Required Setup in Sanity Studio

After starting the development server, you need to create these documents in your Sanity Studio:

1. **Site Settings**: Create a "Site" document for global settings
2. **Homepage**: Create a "Page" document with slug "index"
3. **Blog Template**: Create a "Global module" document with:
   - Path: `blog/`
   - Add "Blog post content" module to the "Before" or "After" section

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity.io
- **Template**: SanityPress

## Support

For issues and questions, refer to the [SanityPress documentation](https://sanitypress.dev/docs).
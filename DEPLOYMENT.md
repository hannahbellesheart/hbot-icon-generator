# GitHub Pages Deployment Guide

This document provides instructions for deploying the HBot Icon Generator to GitHub Pages.

## Automatic Deployment

GitHub Pages can automatically deploy this site from your repository.

### Steps to Enable GitHub Pages:

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub
   - Click on "Settings" tab

2. **Access GitHub Pages Settings**
   - In the left sidebar, click on "Pages"

3. **Configure Source**
   - Under "Source", select the branch you want to deploy (typically `main`)
   - Select `/ (root)` as the folder
   - Click "Save"

4. **Wait for Deployment**
   - GitHub will automatically build and deploy your site
   - This usually takes 1-2 minutes
   - You'll see a green checkmark when deployment is complete

5. **Access Your Site**
   - Your site will be available at: `https://hannahbellesheart.github.io/hbot-icon-generator/`
   - This URL will be displayed in the GitHub Pages settings

## Project Structure for GitHub Pages

This project is already optimized for GitHub Pages:

```
✅ index.html at root (required for GitHub Pages entry point)
✅ assets/ folder for organized static files
✅ _config.yml for GitHub Pages configuration
✅ No build process required (pure HTML/CSS/JS)
```

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the root with your domain name
2. Configure your DNS provider to point to GitHub Pages
3. Update the CNAME setting in GitHub Pages settings

## Troubleshooting

### Site Not Loading
- Ensure the branch and folder are correctly configured in Settings > Pages
- Check that `index.html` exists in the root of your repository
- Wait a few minutes after pushing changes for deployment to complete

### Assets Not Loading
- Verify all asset paths use relative URLs (e.g., `assets/css/style.css`)
- Check that all files are committed and pushed to the repository
- Ensure file names match exactly (case-sensitive)

### Checking Deployment Status
- Go to the "Actions" tab in your repository
- Look for "pages-build-deployment" workflows
- Click on the latest run to see details and any errors

## Local Testing

Before deploying, test your site locally:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve

# Then visit http://localhost:8000
```

## Updates

After making changes:

1. Commit and push your changes to the configured branch
2. GitHub Pages will automatically rebuild and redeploy
3. Changes typically appear within 1-2 minutes

## Notes

- This is a static site with no server-side processing required
- All icon generation happens in the browser (client-side)
- No database or backend services are needed
- The site is fully functional as a static HTML/CSS/JS application
